/**
 * @fileoverview    A class that keeps track of Apache Dispatcher Config files parse trees.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { getCodeLensDefinitions } from "@language-server/core/codelens-provider";
import {
	ApacheDispatcherConfigToken,
	loadApacheDispatcherConfigTreeSitterLanguage,
	tokenizeTextDocument
} from "@language-server/core/tree-sitter";
import { CodeLens, DocumentSymbol, SymbolKind, TextDocuments } from "vscode-languageserver";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

type ApacheDispatcherConfigDocoumentSymbol = {
	node: Parser.SyntaxNode;
	parentSymbols: DocumentSymbol[];
}

export async function waitForDocumentParserTreeManagerInitialization(
	documentParserTreeManager: DocumentParserTreeManager
): Promise<void> {
	return new Promise(function(resolve: (value: void) => void) {
		setTimeout(function() {
			if (
				documentParserTreeManager !== undefined &&
				documentParserTreeManager.initialized
			) {
				resolve();
			}
		}, 1000);
	});
}

export class DocumentParserTreeManager {
	private isInitialized: boolean;

	private treeSitterParser: Parser | undefined;

	private documentParseTree: Map<string, Parser.Tree>;

	constructor() {
		this.isInitialized = false;
		this.treeSitterParser = undefined;
		this.documentParseTree = new Map<string, Parser.Tree>();
	}

	public async initialize(textDocumentManager: TextDocuments<TextDocument>): Promise<void> {
		this.treeSitterParser = await loadApacheDispatcherConfigTreeSitterLanguage();

		for (const document of textDocumentManager.all()) {
			this.updateParseTree(document);
		}

		this.isInitialized = true;
	}

	get initialized(): boolean {
		return this.isInitialized;
	}

	public getDocumentTokenTree(documentUri: string): Parser.Tree | undefined {
		return this.documentParseTree.get(documentUri);
	}

	private createDocumentSymbol(
		parentSyntaxNode: Parser.SyntaxNode,
		selectionSyntaxNode: Parser.SyntaxNode,
		kind: SymbolKind
	): DocumentSymbol {
		const parentTokenRange: Range = {
			start: {
				line: parentSyntaxNode.startPosition.row,
				character: parentSyntaxNode.startPosition.column
			},
			end: {
				line: parentSyntaxNode.endPosition.row,
				character: parentSyntaxNode.endPosition.column
			}
		};

		const selectionRange: Range = {
			start: {
				line: selectionSyntaxNode.startPosition.row,
				character: selectionSyntaxNode.startPosition.column
			},
			end: {
				line: selectionSyntaxNode.endPosition.row,
				character: selectionSyntaxNode.endPosition.column
			}
		};

		return {
			name: selectionSyntaxNode.text,
			kind: kind,
			range: parentTokenRange,
			selectionRange: selectionRange
		};
	}

	private getApacheDispatcherConfigTokenSymbolKind(tokenType: ApacheDispatcherConfigToken): SymbolKind {
		switch (tokenType) {
			case ApacheDispatcherConfigToken.Function:
				return SymbolKind.Function;
			case ApacheDispatcherConfigToken.Property:
				return SymbolKind.Property;
			case ApacheDispatcherConfigToken.Number:
				return SymbolKind.Number;
			case ApacheDispatcherConfigToken.String:
				return SymbolKind.String;
			default:
				return SymbolKind.Null;
		}
	}

	public getDocumentSymbols(documentUri: string): DocumentSymbol[] {
		const syntaxTree: Parser.Tree | undefined = this.documentParseTree.get(documentUri);

		if (syntaxTree === undefined) {
			return [];
		}

		const rootSymbols: DocumentSymbol[] = [];
		const documentSymbolsStack: ApacheDispatcherConfigDocoumentSymbol[] = [
			{
				node: syntaxTree.rootNode,
				parentSymbols: rootSymbols
			}
		];

		while (documentSymbolsStack.length > 0) {
			const documentSymbol: ApacheDispatcherConfigDocoumentSymbol | undefined = documentSymbolsStack.pop();

			if (documentSymbol === undefined || documentSymbol.node === undefined) {
				continue;
			}

			if (documentSymbol.node.hasError()) {
				continue;
			}

			let symbol: DocumentSymbol | undefined;
			let symbolChildren: DocumentSymbol[] = [];

			if (
				documentSymbol.node.type === ApacheDispatcherConfigToken.Function ||
				documentSymbol.node.type === ApacheDispatcherConfigToken.Property
			) {
				const selectionSyntaxNode: Parser.SyntaxNode | null = documentSymbol.node.firstChild;

				if (
					selectionSyntaxNode !== null &&
					(
						selectionSyntaxNode.type === ApacheDispatcherConfigToken.FunctionName ||
						selectionSyntaxNode.type === ApacheDispatcherConfigToken.PropertyName
					)
				) {
					symbol = this.createDocumentSymbol(
						documentSymbol.node,
						selectionSyntaxNode,
						this.getApacheDispatcherConfigTokenSymbolKind(documentSymbol.node.type)
					);

					documentSymbol.parentSymbols.push(symbol);

					symbolChildren = symbol.children = [];
				}
			} else if (
				documentSymbol.node.type === ApacheDispatcherConfigToken.String ||
				documentSymbol.node.type === ApacheDispatcherConfigToken.Number
			) {
				symbol = this.createDocumentSymbol(
					documentSymbol.node,
					documentSymbol.node,
					this.getApacheDispatcherConfigTokenSymbolKind(documentSymbol.node.type)
				);

				documentSymbol.parentSymbols.push(symbol);
			}

			let currentSyntaxNode: Parser.SyntaxNode | null = documentSymbol.node.firstChild;

			while (currentSyntaxNode !== null) {
				documentSymbolsStack.push({
					node: currentSyntaxNode,
					parentSymbols: symbol ? symbolChildren : documentSymbol.parentSymbols
				});

				currentSyntaxNode = currentSyntaxNode.nextSibling;
			}
		}

		return rootSymbols;
	}

	public getDocumentCodeLensDefinitions(documentUri: string): CodeLens[] {
		return getCodeLensDefinitions(this.documentParseTree.get(documentUri))
	}

	public updateParseTree(document: TextDocument): void {
		if (this.treeSitterParser === undefined) {
			throw new Error("Tree-sitter parser has not been initialized!");
		}

		const documentUri = document.uri;
		const textDocumentParserTree: Parser.Tree = tokenizeTextDocument(this.treeSitterParser, document);

		this.documentParseTree.set(documentUri, textDocumentParserTree);
	}
}
