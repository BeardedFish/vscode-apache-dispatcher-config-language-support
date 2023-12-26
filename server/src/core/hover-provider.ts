/**
 * @fileoverview    Handles all syntax node hover logic for Apache Dispatcher Config files.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { INCLUDE_FUNCTION_NAME } from "@language-server/constants/function";
import { getDispatcherNamespace } from "@language-server/core/dispatcher";
import { DocumentParserTreeManager } from "@language-server/core/document-parser-tree-manager";
import { DocumentationManager } from "@language-server/core/documentation-manager";
import {
	ApacheDispatcherNamespace,
	ApacheDispatcherNamespaceSchema,
	ApacheDispatcherPropertySchema,
	ApacheDispatcherSchema,
	getCurrentSchema
} from "@language-server/core/schema";
import {
	ApacheDispatcherConfigToken,
	getCurrentSyntaxNode,
	getPropertyPath
} from "@language-server/core/tree-sitter";
import {
	Hover,
	MarkupContent,
	MarkupKind,
	TextDocumentPositionParams,
	TextDocuments
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

type TextDocumentPosition = {
	line: number;
	character: number
}

function convertPointToPosition(point: Parser.Point): TextDocumentPosition {
	return {
		line: point.row,
		character: point.column
	};
}

export async function handleHover(
	documentManager: TextDocuments<TextDocument>,
	documentParserTreeManager: DocumentParserTreeManager,
	documentationManager: DocumentationManager,
	textDocumentPosition: TextDocumentPositionParams
): Promise<Hover | null> {
	const document: TextDocument | undefined = documentManager.get(textDocumentPosition.textDocument.uri);

	if (document === undefined || documentParserTreeManager === undefined) {
		return null;
	}

	const hoverContents: MarkupContent  = {
		kind: MarkupKind.Markdown,
		value: ""
	};

	const currentSyntaxNode: Parser.SyntaxNode | undefined = getCurrentSyntaxNode(
		documentParserTreeManager.getDocumentTokenTree(document.uri),
		textDocumentPosition
	);

	if (currentSyntaxNode === undefined) {
		return null;
	}

	if (currentSyntaxNode.type === ApacheDispatcherConfigToken.FunctionName) {
		const functionName: string = currentSyntaxNode.text;

		switch (functionName) {
			case INCLUDE_FUNCTION_NAME: {
				const documentationContent: string | undefined = documentationManager.getDocumentationContent("FUNCTION_INCLUDE.md");

				if (documentationContent !== undefined) {
					hoverContents.value = documentationContent;
				}

				break;
			}
		}
	} else if (currentSyntaxNode.type === ApacheDispatcherConfigToken.PropertyName) {
		const propertyName: string = currentSyntaxNode.text || "";
		const dispatcherNamespace: ApacheDispatcherNamespace = getDispatcherNamespace(document.uri);
		const pathToCurrentProperty: string[] = getPropertyPath(currentSyntaxNode);
		const schema: ApacheDispatcherSchema | undefined = getCurrentSchema(dispatcherNamespace, pathToCurrentProperty);

		if (
			schema === undefined ||
			!(propertyName in schema)
		) {
			return null;
		}

		const hoveredPropertySchema: ApacheDispatcherPropertySchema = (schema as ApacheDispatcherNamespaceSchema)[propertyName] as ApacheDispatcherPropertySchema;
		const documentationId: string | undefined = hoveredPropertySchema.documentationFileName;

		if (documentationId !== undefined) {
			const documentationContent: string | undefined = documentationManager.getDocumentationContent(documentationId);

			if (documentationContent !== undefined) {
				hoverContents.value = documentationContent;
			}
		}
	}

	if (hoverContents.value.length === 0) {
		return null;
	}

	return {
		contents: hoverContents,
		range: {
			start: convertPointToPosition(currentSyntaxNode.startPosition),
			end: convertPointToPosition(currentSyntaxNode.endPosition)
		}
	};
}
