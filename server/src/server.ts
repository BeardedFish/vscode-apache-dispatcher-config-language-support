/**
 * @fileoverview    Main entrypoint of the Apache Dispatcher Config Support for Visual Studio Code language server.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { AUTOCOMPLETION_TRIGGER_CHARACTERS, handleAutoCompletion } from "@language-server/core/autocompletion";
import { getDefinition } from "@language-server/core/definition-provider";
import { getDocumentParseTreeDiagnostics } from "@language-server/core/diagnostics";
import { DocumentParserTreeManager, waitForDocumentParserTreeManagerInitialization } from "@language-server/core/document-parser-tree-manager";
import { DocumentationManager } from "@language-server/core/documentation-manager";
import { handleHover } from "@language-server/core/hover-provider";
import * as path from "path";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
	ClientCapabilities,
	CompletionItem,
	Connection,
	DefinitionLink,
	DefinitionParams,
	Diagnostic,
	DidChangeConfigurationNotification,
	DocumentSymbol,
	DocumentSymbolParams,
	Hover,
	InitializeParams,
	InitializeResult,
	ProposedFeatures,
	TextDocumentChangeEvent,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	TextDocuments,
	createConnection
} from "vscode-languageserver/node";
import Parser = require("web-tree-sitter");

const CONNECTION: Connection = createConnection(ProposedFeatures.all);
const DOCUMENT_MANAGER: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;

let documentParserTreeManager: DocumentParserTreeManager | undefined;
let documentationManager: DocumentationManager;

function updateDocumentParseTreeAndSendDiagnostics(
	document: TextDocument,
	sendDiagnostics: boolean = true
): void {
	if (documentParserTreeManager === undefined) {
		return;
	}

	const parseTreeUpdated: boolean = documentParserTreeManager.updateParseTree(document);

	if (parseTreeUpdated && sendDiagnostics) {
		const documentUri: string = document.uri;
		const documentTokenTree: Parser.Tree | undefined = documentParserTreeManager.getDocumentTokenTree(documentUri);
		const currentDocumentDiagnostics: Diagnostic[] | undefined = getDocumentParseTreeDiagnostics(documentTokenTree);

		if (currentDocumentDiagnostics !== undefined) {
			CONNECTION.sendDiagnostics({
				uri: documentUri,
				diagnostics: currentDocumentDiagnostics
			});
		}
	}
}

CONNECTION.onInitialize(async function(initializeParams: InitializeParams): Promise<InitializeResult> {
	console.info("Initializing language server...");

	const capabilities: ClientCapabilities = initializeParams.capabilities;

	hasConfigurationCapability = !!(
		capabilities.workspace &&
		!!capabilities.workspace.configuration
	);

	const result: InitializeResult = {
		capabilities: {
			completionProvider: {
				triggerCharacters: AUTOCOMPLETION_TRIGGER_CHARACTERS
			},
			definitionProvider: true,
			documentSymbolProvider: true,
			hoverProvider: true,
			textDocumentSync: TextDocumentSyncKind.Incremental
		},
		serverInfo: {
			name: "Apache Dispatcher Config Language Server",
			version: "1.3.2"
		}
	};

	return result;
});

CONNECTION.onInitialized(async function(): Promise<void> {
	if (hasConfigurationCapability) {
		CONNECTION.client.register(DidChangeConfigurationNotification.type, undefined);
	}

	documentationManager = new DocumentationManager(path.join(__dirname, "documentation"));

	await documentationManager.initialize((loadedDocumentationFilesCount: number) => {
		console.info(`Loaded ${loadedDocumentationFilesCount} documentation files into memory.`);
	});

	documentParserTreeManager = new DocumentParserTreeManager();

	await documentParserTreeManager.initialize(DOCUMENT_MANAGER);

	console.info("Language server initialized.");
});

CONNECTION.onCompletion(
	async (textDocumentPositionParams: TextDocumentPositionParams): Promise<CompletionItem[]> => {
		return await handleAutoCompletion(
			DOCUMENT_MANAGER,
			documentParserTreeManager!,
			documentationManager,
			textDocumentPositionParams
		);
	}
);

CONNECTION.onDefinition(async function(definitionParams: DefinitionParams): Promise<DefinitionLink[] | undefined> {
	if (documentParserTreeManager === undefined) {
		return undefined;
	}

	return await getDefinition(
		documentParserTreeManager,
		definitionParams
	);
});

CONNECTION.onDocumentSymbol(async function(documentSymbolParams: DocumentSymbolParams): Promise<DocumentSymbol[]> {
	if (documentParserTreeManager === undefined) {
		await waitForDocumentParserTreeManagerInitialization(documentParserTreeManager);
	}

	const document: TextDocument | undefined = DOCUMENT_MANAGER.get(documentSymbolParams.textDocument.uri);

	if (document !== undefined) {
		return documentParserTreeManager!.getDocumentSymbols(document.uri);
	}

	return [];
});

CONNECTION.onHover(
	async (textDocumentPositionParams: TextDocumentPositionParams): Promise<Hover | null> => {
		return await handleHover(
			DOCUMENT_MANAGER,
			documentParserTreeManager!,
			documentationManager,
			textDocumentPositionParams
		);
	}
);

DOCUMENT_MANAGER.onDidOpen(function(event: TextDocumentChangeEvent<TextDocument>): void {
	updateDocumentParseTreeAndSendDiagnostics(event.document, false);
});

DOCUMENT_MANAGER.onDidChangeContent(function(event: TextDocumentChangeEvent<TextDocument>): void {
	updateDocumentParseTreeAndSendDiagnostics(event.document);
});

DOCUMENT_MANAGER.listen(CONNECTION);
CONNECTION.listen();
