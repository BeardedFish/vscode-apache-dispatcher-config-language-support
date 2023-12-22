/**
 * @fileoverview    Utility functions for dealing with a Visual Studio Code text document.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import {
	DOUBLE_QUOTE_PREFIX_CHARACTER,
	FUNCTION_PREFIX_CHARACTER,
	PROPERTY_PREFIX_CHARACTER,
	SINGLE_QUOTE_PREFIX_CHARACTER
} from "@language-server/constants/trigger-character";
import { ApacheDispatcherConfigToken } from "@language-server/core/tree-sitter";
import { TextDocumentPositionParams } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

export enum TriggerCharacterKind {
	Function,
	Property,
	String
}

export function getCharacterAtCursor(
	document: TextDocument | undefined,
	cursorPositionParams: TextDocumentPositionParams
): string | undefined {
	if (document === undefined) {
		return undefined;
	}

	const cursorCharacter: number = cursorPositionParams.position.character;
	const cursorLine: number = cursorPositionParams.position.line;

	const triggerCharacter: string = document.getText({
		start: {
			line: cursorLine,
			character: cursorCharacter - 1
		},
		end: cursorPositionParams.position
	});

	return triggerCharacter;
}

export function getDocumentCurrentLineTextFromCursor(
	document: TextDocument | undefined,
	textDocumentPositionParams: TextDocumentPositionParams
): string {
	if (document === undefined) {
		return "";
	}

	const line: number = textDocumentPositionParams.position.line;
	const character: number = textDocumentPositionParams.position.character;

	return document.getText({
		start: {
			line: line,
			character: 0
		},
		end: {
			line: line,
			character: character
		}
	});
}

export function getCurrentPropertyName(
	treeSitterParser: Parser,
	document: TextDocument,
	positionParams: TextDocumentPositionParams
): string | undefined {
	const documentText: string = document.getText();
	const documentSyntaxTree: Parser.Tree = treeSitterParser.parse(documentText);

	const currentLineText: string = getDocumentCurrentLineTextFromCursor(document, positionParams);
	const trailingWhitespaceCount: number = currentLineText.length - currentLineText.trimEnd().length;
	const adjustedColumn: number = positionParams.position.character - trailingWhitespaceCount - 1;

	const currentNode: Parser.SyntaxNode = documentSyntaxTree.rootNode.descendantForPosition({
		row: positionParams.position.line,
		column: Math.max(0, adjustedColumn)
	});

	if (currentNode.type === ApacheDispatcherConfigToken.PropertyName) {
		return currentNode.text;
	}

	return undefined;
}

export function isCursorBeforeSyntaxNode(
	document: TextDocument,
	textDocumentPosition: TextDocumentPositionParams,
	syntaxNode: Parser.SyntaxNode | null
): boolean {
	if (syntaxNode === null) {
		return false;
	}

	const cursorPosition: Position = textDocumentPosition.position;
	const syntaxNodeStartPosition: Position = document.positionAt(syntaxNode.startIndex);

	return cursorPosition.line === syntaxNodeStartPosition.line && cursorPosition.character === syntaxNodeStartPosition.character;
}

export function getTriggerCharacterType(
	document: TextDocument | undefined,
	cursorPositionParams: TextDocumentPositionParams
): TriggerCharacterKind | undefined {
	if (document === undefined) {
		return undefined;
	}

	const triggerCharacter: string | undefined = getCharacterAtCursor(document, cursorPositionParams);

	if (triggerCharacter === FUNCTION_PREFIX_CHARACTER) {
		return TriggerCharacterKind.Function;
	}

	if (triggerCharacter === PROPERTY_PREFIX_CHARACTER) {
		return TriggerCharacterKind.Property;
	}

	if (
		triggerCharacter === SINGLE_QUOTE_PREFIX_CHARACTER ||
		triggerCharacter === DOUBLE_QUOTE_PREFIX_CHARACTER
	) {
		return TriggerCharacterKind.String;
	}

	return undefined;
}
