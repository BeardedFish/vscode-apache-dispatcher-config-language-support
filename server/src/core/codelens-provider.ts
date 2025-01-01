/**
 * @fileoverview    Handles all CodeLens logic for Apache Dispatcher Config files.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { ApacheDispatcherConfigToken } from "@language-server/core/tree-sitter";
import { removeOuterQuotes } from "@language-server/utils/string";
import { CodeLens, Command, Range } from "vscode-languageserver";
import Parser = require("web-tree-sitter");

function containsEnvironmentVariable(value: string): boolean {
	return /\$\{.*?\}/.test(value);
}

export function getCodeLensDefinitions(syntaxTree: Parser.Tree | undefined): CodeLens[] {
	if (syntaxTree === undefined) {
		return [];
	}

	const codeLensDefinitions: CodeLens[] = [];
	const syntaxNodeStack: Parser.SyntaxNode[] = [ syntaxTree.rootNode ];

	while (syntaxNodeStack.length > 0) {
		const syntaxNode: Parser.SyntaxNode | undefined = syntaxNodeStack.pop();

		if (syntaxNode === undefined || syntaxNode.hasError()) {
			continue;
		}

		const syntaxNodeValue: string = removeOuterQuotes(syntaxNode.text);

		if (
			syntaxNode.type === ApacheDispatcherConfigToken.String &&
			containsEnvironmentVariable(syntaxNodeValue)
		) {
			const range: Range = {
				start: {
					line: syntaxNode.startPosition.row,
					character: syntaxNode.startPosition.column
				},
				end: {
					line: syntaxNode.endPosition.row,
					character: syntaxNode.endPosition.column
				}
			};

			// TODO: Look into creating a lookup table for environment variables under the /conf.d/variables folder
			codeLensDefinitions.push({
				range: range,
				command: Command.create(`"${syntaxNodeValue}" resolves to ""`, "")
			});
		}

		for (const childNode of syntaxNode.children) {
			syntaxNodeStack.push(childNode);
		}
	}

	return codeLensDefinitions;
}
