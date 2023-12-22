/**
 * @fileoverview    A class that keeps track of an Apache Dispatcher Config files Parse Trees.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import {
	loadApacheDispatcherConfigTreeSitterLanguage,
	tokenizeTextDocument
} from "@language-server/core/tree-sitter";
import { TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import Parser = require("web-tree-sitter");

export class DocumentParserTreeManager {
	private treeSitterParser: Parser | undefined;

	private documentParseTree: Map<string, Parser.Tree>;

	constructor() {
		this.treeSitterParser = undefined;
		this.documentParseTree = new Map<string, Parser.Tree>();
	}

	public async initialize(textDocumentManager: TextDocuments<TextDocument>): Promise<void> {
		this.treeSitterParser = await loadApacheDispatcherConfigTreeSitterLanguage();

		for (const document of textDocumentManager.all()) {
			this.updateParseTree(document);
		}
	}

	public getDocumentTokenTree(documentUri: string): Parser.Tree | undefined {
		return this.documentParseTree.get(documentUri);
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
