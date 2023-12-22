/**
 * @fileoverview    Provides functionalities for parsing and tokenizing Apache Dispatcher Config files
 *                  using the Web Tree-sitter library.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import * as path from "path";
import { TextDocumentPositionParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

export enum ApacheDispatcherConfigToken {
	Root = "source_file",
	Comment = "comment",
	Function = "function",
	FunctionName = "function_name",
	Property = "property",
	PropertyName = "property_name",
	ScopedProperty = "scoped_property",
	String = "string"
}

export async function loadApacheDispatcherConfigTreeSitterLanguage(): Promise<Parser> {
	await Parser.init();

	const parser: Parser = new Parser();

	const apacheDispatcherConfigLanguage: Parser.Language = await Parser.Language.load(
		path.join(__dirname, "tree-sitter.wasm")
	);

	parser.setLanguage(apacheDispatcherConfigLanguage);

	return parser;
}

export function tokenizeTextDocument(
	treeSitterParser: Parser,
	document: TextDocument
): Parser.Tree {
	return treeSitterParser.parse(document.getText());
}

export function getCurrentSyntaxNode(
	documentSyntaxTree: Parser.Tree | undefined,
	positionsParams: TextDocumentPositionParams
): Parser.SyntaxNode | undefined {
	if (documentSyntaxTree === undefined) {
		return undefined;
	}

	return documentSyntaxTree.rootNode.descendantForPosition({
		row: positionsParams.position.line,
		column: positionsParams.position.character
	});
}

export function getPropertyPath(syntaxNode: Parser.SyntaxNode): string[] {
	const pathToCurrentProperty: string[] = [];

	let currentSyntaxNode: Parser.SyntaxNode | null = syntaxNode;

	while (currentSyntaxNode != null) {
		if (
			currentSyntaxNode !== null &&
			currentSyntaxNode.type === ApacheDispatcherConfigToken.ScopedProperty
		) {
			const parentProperty: Parser.SyntaxNode | null = currentSyntaxNode.parent;

			if (
				parentProperty !== null &&
				parentProperty.type === ApacheDispatcherConfigToken.Property
			) {
				const propertyName: Parser.SyntaxNode | null = parentProperty.firstChild;

				if (
					propertyName !== null &&
					propertyName.type === ApacheDispatcherConfigToken.PropertyName
				) {
					pathToCurrentProperty.push(propertyName.text);
				}
			}
		}

		currentSyntaxNode = currentSyntaxNode.parent;
	}

	return pathToCurrentProperty;
}
