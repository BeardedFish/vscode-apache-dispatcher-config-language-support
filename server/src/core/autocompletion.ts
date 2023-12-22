/**
 * @fileoverview    Handles all autocompletion logic for Apache Dispatcher Config files.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { INCLUDE_FUNCTION_NAME } from "@language-server/constants/function";
import {
	DOUBLE_QUOTE_PREFIX_CHARACTER,
	FUNCTION_PREFIX_CHARACTER,
	PROPERTY_PREFIX_CHARACTER,
	SINGLE_QUOTE_PREFIX_CHARACTER
} from "@language-server/constants/trigger-character";
import { getDispatcherNamespace } from "@language-server/core/dispatcher";
import { DocumentParserTreeManager } from "@language-server/core/document-parser-tree-manager";
import { DocumentationManager } from "@language-server/core/documentation-manager";
import {
	ApacheDispatcherNamespace,
	ApacheDispatcherNamespaceSchema,
	ApacheDispatcherPropertyKind,
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
	TriggerCharacterKind,
	getTriggerCharacterType,
	isCursorBeforeSyntaxNode
} from "@language-server/utils/document";
import {
	CompletionItem,
	CompletionItemKind,
	CompletionItemTag,
	InsertTextFormat,
	MarkupKind,
	TextDocumentPositionParams,
	TextDocuments
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

export const AUTOCOMPLETION_TRIGGER_CHARACTERS: string[] = [
	FUNCTION_PREFIX_CHARACTER,
	PROPERTY_PREFIX_CHARACTER,
	SINGLE_QUOTE_PREFIX_CHARACTER,
	DOUBLE_QUOTE_PREFIX_CHARACTER
];

function getAuthoredPropertiesInScope(syntaxNode: Parser.SyntaxNode): string[] {
	let syntaxNodeContext: Parser.SyntaxNode | null = syntaxNode;

	const properties: string[] = [];

	if (syntaxNodeContext.type === ApacheDispatcherConfigToken.Property) {
		syntaxNodeContext = syntaxNodeContext.parent;
	}

	if (syntaxNodeContext === null) {
		return [];
	}

	const childrenNodes: Parser.SyntaxNode[] = syntaxNodeContext.children;

	for (const node of childrenNodes) {
		if (node.type !== ApacheDispatcherConfigToken.Property) {
			continue;
		}

		const propertyName: Parser.SyntaxNode | null = node.firstChild;

		if (
			propertyName !== null &&
			propertyName.type === ApacheDispatcherConfigToken.PropertyName
		) {
			properties.push(propertyName.text);
		}
	}

	return properties;
}

async function getCompletionItemsForNamespace(
	documentationManager: DocumentationManager,
	namespace: ApacheDispatcherNamespace,
	syntaxNode: Parser.SyntaxNode | null
): Promise<CompletionItem[]> {
	if (
		syntaxNode === null ||
		syntaxNode.firstChild === null ||
		syntaxNode.type === ApacheDispatcherConfigToken.Comment
	) {
		return [];
	}

	const pathToCurrentProperty: string[] = getPropertyPath(syntaxNode);
	const schema: ApacheDispatcherSchema | undefined = getCurrentSchema(namespace, pathToCurrentProperty);

	if (schema === undefined) {
		return [];
	}

	if (pathToCurrentProperty.length === 0) {
		const result: CompletionItem[] = [];
		const currentPropertyScope: ApacheDispatcherSchema = schema.children || schema;
		const propertiesInCurrentScope: string[] = getAuthoredPropertiesInScope(syntaxNode);

		for (const propertyName of Object.keys(currentPropertyScope)) {
			const currentPropertySchema: ApacheDispatcherSchema = (currentPropertyScope as ApacheDispatcherNamespaceSchema)[propertyName];

			if (
				currentPropertySchema.isPlaceholder ||
				propertiesInCurrentScope.includes(propertyName)
			) {
				continue;
			}

			let propertyInfo: ApacheDispatcherSchema;

			if (schema.children) {
				propertyInfo = (schema.children as ApacheDispatcherNamespaceSchema)[propertyName] as ApacheDispatcherPropertySchema;
			} else {
				propertyInfo = currentPropertySchema;
			}

			const propertyNameSanitized: string = propertyName.replace(/^\/+/, "");
			const isScopedProperty: boolean = propertyInfo.kind === ApacheDispatcherPropertyKind.Scoped;

			let insertTextTemplate: string;

			if (isScopedProperty) {
				insertTextTemplate = `${propertyNameSanitized} {$0}`;
			} else {
				insertTextTemplate = `${propertyNameSanitized} "$0"`;
			}

			const completionItem: CompletionItem = {
				label: propertyName,
				detail: isScopedProperty ? "Scoped Property" : "Property",
				kind: CompletionItemKind.Property,
				insertText: insertTextTemplate,
				insertTextFormat: InsertTextFormat.Snippet
			};

			// Only re-trigger autocompletion if the current property has autocompletion items
			if (
				propertyInfo.kind === ApacheDispatcherPropertyKind.Value &&
				"autocompletionItems" in propertyInfo
			) {
				completionItem.command = {
					title: "Re-trigger auto completion suggestions",
					command: "editor.action.triggerSuggest"
				};
			}

			if (propertyInfo.deprecated) {
				completionItem.tags = [ CompletionItemTag.Deprecated ];
			}

			const documentationFileName: string | undefined = (propertyInfo as ApacheDispatcherPropertySchema).documentationFileName;

			if (documentationFileName !== undefined) {
				const documentationContent: string | undefined = documentationManager.getDocumentationContent(documentationFileName);

				if (documentationContent !== undefined) {
					completionItem.documentation = {
						kind: MarkupKind.Markdown,
						value: documentationContent
					};
				}
			}

			result.push(completionItem);
		}

		return result;
	}

	return [];
}

function isStringTokenEmpty(value: string): boolean {
	return value.length - 2 === 0;
}

export async function handleAutoCompletion(
	documentManager: TextDocuments<TextDocument>,
	documentParserTreeManager: DocumentParserTreeManager,
	documentationManager: DocumentationManager,
	textDocumentPosition: TextDocumentPositionParams
): Promise<CompletionItem[]> {
	const document: TextDocument | undefined = documentManager.get(textDocumentPosition.textDocument.uri);

	if (document === undefined) {
		return [];
	}

	const triggerCharacter: TriggerCharacterKind | undefined = getTriggerCharacterType(document, textDocumentPosition);
	const dispatcherNamespace: ApacheDispatcherNamespace = getDispatcherNamespace(document.uri);

	const currentSyntaxNode: Parser.SyntaxNode | undefined = getCurrentSyntaxNode(
		documentParserTreeManager.getDocumentTokenTree(document.uri),
		textDocumentPosition
	);

	if (currentSyntaxNode === undefined) {
		return [];
	}

	if (
		triggerCharacter === TriggerCharacterKind.Function &&
		currentSyntaxNode.type !== ApacheDispatcherConfigToken.Comment &&
		currentSyntaxNode.type !== ApacheDispatcherConfigToken.Property &&
		currentSyntaxNode.type !== ApacheDispatcherConfigToken.String
	) {
		return [
			{
				label: INCLUDE_FUNCTION_NAME,
				detail: "Function",
				kind: CompletionItemKind.Function,
				insertText: "include \"$0\"",
				insertTextFormat: InsertTextFormat.Snippet
			}
		];
	}

	if (currentSyntaxNode.type === ApacheDispatcherConfigToken.String) {
		const value: string = currentSyntaxNode.text;

		if (
			!isStringTokenEmpty(value) ||
			isCursorBeforeSyntaxNode(document, textDocumentPosition, currentSyntaxNode)
		) {
			return [];
		}

		const currentSyntaxNodeParent: Parser.SyntaxNode | null = currentSyntaxNode.parent;

		if (currentSyntaxNodeParent?.type === ApacheDispatcherConfigToken.Property) {
			const pathToCurrentProperty: string[] = getPropertyPath(currentSyntaxNode);
			const propertyName = currentSyntaxNodeParent.firstChild?.text;
			const schema: ApacheDispatcherSchema | undefined = getCurrentSchema(dispatcherNamespace, pathToCurrentProperty);

			if (schema === undefined || propertyName === undefined) {
				return [];
			}

			const currentPropertySchema: ApacheDispatcherSchema = (schema as ApacheDispatcherNamespaceSchema)[propertyName];

			if ("autocompletionItems" in currentPropertySchema) {
				const result: CompletionItem[] = [];

				for (const item of (currentPropertySchema as ApacheDispatcherPropertySchema).autocompletionItems!) {
					const autocompletionItem: CompletionItem = {
						label: item.label,
						kind: CompletionItemKind.Value,
						insertText: item.label,
						insertTextFormat: InsertTextFormat.PlainText
					};

					if (item.detail) {
						autocompletionItem.detail = item.detail;
					}

					if (item.documentation) {
						autocompletionItem.documentation = item.documentation;
					}

					result.push(autocompletionItem);
				}

				return result;
			}
		}

		return [];
	}

	const completionItems: CompletionItem[] = await getCompletionItemsForNamespace(
		documentationManager,
		dispatcherNamespace,
		currentSyntaxNode
	);

	return completionItems;
}
