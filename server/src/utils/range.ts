/**
 * @fileoverview    Utility functions for dealing with text editor ranges.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { Range } from "vscode-languageserver";
import Parser = require("web-tree-sitter");

export function getSyntaxNodeRange(syntaxNode: Parser.SyntaxNode): Range {
	return {
		start: {
			line: syntaxNode.startPosition.row,
			character: syntaxNode.startPosition.column
		},
		end: {
			line: syntaxNode.endPosition.row,
			character: syntaxNode.endPosition.column
		}
	};
}
