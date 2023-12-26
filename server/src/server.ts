/**
 * @fileoverview    Main entrypoint of the Apache Dispatcher Config Support for Visual Studio Code language server.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { AUTOCOMPLETION_TRIGGER_CHARACTERS, handleAutoCompletion } from "@language-server/core/autocompletion";
import { getDefinition } from "@language-server/core/definition-provider";
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

const CONNECTION: Connection = createConnection(ProposedFeatures.all);
const DOCUMENT_MANAGER: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;

let documentParserTreeManager: DocumentParserTreeManager;
let documentationManager: DocumentationManager;

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
			version: "1.2.0"
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
			documentParserTreeManager,
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
		return documentParserTreeManager.getDocumentSymbols(document.uri);
	}

	return [];
});

CONNECTION.onHover(
	async (textDocumentPositionParams: TextDocumentPositionParams): Promise<Hover | null> => {
		return await handleHover(
			DOCUMENT_MANAGER,
			documentParserTreeManager,
			documentationManager,
			textDocumentPositionParams
		);
	}
);

DOCUMENT_MANAGER.onDidOpen(function(event: TextDocumentChangeEvent<TextDocument>) {
	documentParserTreeManager?.updateParseTree(event.document);
});

DOCUMENT_MANAGER.onDidChangeContent(async function(event: TextDocumentChangeEvent<TextDocument>): Promise<void> {
	documentParserTreeManager?.updateParseTree(event.document);
});

DOCUMENT_MANAGER.listen(CONNECTION);
CONNECTION.listen();
