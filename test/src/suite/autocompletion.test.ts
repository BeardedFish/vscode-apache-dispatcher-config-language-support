import * as assert from "assert";
import * as vscode from "vscode";
import {
	activateApacheDispatcherConfigExtension,
	openDocumentByRelativeUri
} from "../utils/extension";

/**
 * @returns The position after the property that was typed in.
 */
async function simulateTypingProperty(
	textEditor: vscode.TextEditor,
	cursorPosition: vscode.Position,
	propertyName: string = ""
): Promise<vscode.Position> {
	await textEditor.edit(function(editBuilder: vscode.TextEditorEdit): void {
		editBuilder.insert(cursorPosition, `/${propertyName}`);
	});

	return new vscode.Position(cursorPosition.line, cursorPosition.character + 1);
}

async function getAutocompletionItemsAtPosition(
	textDocument: vscode.TextDocument,
	cursorPosition: vscode.Position
): Promise<vscode.CompletionList> {
	return (
		await vscode.commands.executeCommand(
			"vscode.executeCompletionItemProvider",
			textDocument.uri,
			cursorPosition
		)
	) as vscode.CompletionList;
}

async function assertAutocompletionListContainsItems(
	textDocument: vscode.TextDocument,
	cursorPosition: vscode.Position,
	expectedAutocompletionList: vscode.CompletionList
): Promise<void> {
	const autocompletionList: vscode.CompletionList = await getAutocompletionItemsAtPosition(
		textDocument,
		cursorPosition
	);

	if (expectedAutocompletionList.items.length > 0) {
		assert.ok(
			autocompletionList.items.length > 0,
			"Autocompletion list was empty"
		);
	}

	for (const expectedAutocompletionItem of expectedAutocompletionList.items) {
		let equivalentAutocompletionItem: vscode.CompletionItem | undefined = undefined;

		for (const autocompletionItem of autocompletionList.items) {
			if (autocompletionItem.label === expectedAutocompletionItem.label) {
				equivalentAutocompletionItem = autocompletionItem;
				break;
			}
		}

		if (equivalentAutocompletionItem !== undefined) {
			assert.equal(
				equivalentAutocompletionItem.kind,
				expectedAutocompletionItem.kind,
				`Autocompletion kind for '${equivalentAutocompletionItem.label}' does not match`
			);
		} else {
			throw new Error(`'${expectedAutocompletionItem.label}' was not found in the autocompletion list`);
		}
	}
}

async function assertZeroAutocompletionItemSuggestions(
	textDocument: vscode.TextDocument,
	cursorPosition: vscode.Position
): Promise<void> {
	const autocompletionList: vscode.CompletionList = await getAutocompletionItemsAtPosition(
		textDocument,
		cursorPosition
	);

	assert.equal(autocompletionList.items.length, 0, "Autocompletion list is not empty");
}

async function assertDoesNotContainAutocompletionItem(
	textDocument: vscode.TextDocument,
	cursorPosition: vscode.Position,
	autocompletionLabel: string
): Promise<void> {
	const autocompletionList: vscode.CompletionList = await getAutocompletionItemsAtPosition(
		textDocument,
		cursorPosition
	);

	let equivalentAutocompletionItem: vscode.CompletionItem | undefined = undefined;

	for (const autocompletionItem of autocompletionList.items) {
		if (autocompletionItem.label === autocompletionLabel) {
			equivalentAutocompletionItem = autocompletionItem;
			break;
		}
	}

	assert.equal(equivalentAutocompletionItem, undefined);
}

suite("Apache Dispatcher Config Language Support for Visual Studio Code Autocompletion Test Suite", () => {
	vscode.window.showInformationMessage("Running tests...");

	setup(async () => {
		await activateApacheDispatcherConfigExtension();
	});

	teardown(async () => {
		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
	});

	test("Global Scope Autocompletion", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/global.any");
		const cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(0, 0));

		await assertAutocompletionListContainsItems(
			textEditor.document,
			cursorPosition,
			{
				items: [
					{ label: "/farms", kind: vscode.CompletionItemKind.Property },
					{ label: "/ignoreEINTR", kind: vscode.CompletionItemKind.Property },
					{ label: "/name", kind: vscode.CompletionItemKind.Property }
				]
			}
		);
	});

	test("Farm Scope Autocompletion", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/dispatcher.any");

		let cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(5, 7));

		await assertAutocompletionListContainsItems(
			textEditor.document,
			cursorPosition,
			{
				items: [
					{ label: "/auth_checker", kind: vscode.CompletionItemKind.Property },
					{ label: "/cache", kind: vscode.CompletionItemKind.Property },
					{ label: "/clientheaders", kind: vscode.CompletionItemKind.Property },
					{ label: "/failover", kind: vscode.CompletionItemKind.Property },
					{ label: "/filter", kind: vscode.CompletionItemKind.Property },
					{ label: "/health_check", kind: vscode.CompletionItemKind.Property },
					{ label: "/homepage", kind: vscode.CompletionItemKind.Property },
					{ label: "/info", kind: vscode.CompletionItemKind.Property },
					{ label: "/propagateSyndPost", kind: vscode.CompletionItemKind.Property },
					{ label: "/renders", kind: vscode.CompletionItemKind.Property },
					{ label: "/retryDelay", kind: vscode.CompletionItemKind.Property },
					{ label: "/sessionmanagement", kind: vscode.CompletionItemKind.Property },
					{ label: "/statistics", kind: vscode.CompletionItemKind.Property },
					{ label: "/stickyConnections", kind: vscode.CompletionItemKind.Property },
					{ label: "/stickyConnectionsFor", kind: vscode.CompletionItemKind.Property },
					{ label: "/unavailablePenalty", kind: vscode.CompletionItemKind.Property },
					{ label: "/vanity_urls", kind: vscode.CompletionItemKind.Property },
					{ label: "/virtualhosts", kind: vscode.CompletionItemKind.Property }
				]
			}
		);

		cursorPosition = await simulateTypingProperty(textEditor, new vscode.Position(8, 4));

		assertZeroAutocompletionItemSuggestions(textEditor.document, cursorPosition);
	});

	test("Filter Scope Autocompletion (via `filters` directory) - Shows All Items in Filter '/0001'", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/filters/filter.any");
		const cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(1, 4));

		await assertAutocompletionListContainsItems(
			textEditor.document,
			cursorPosition,
			{
				items: [
					{ label: "/extension", kind: vscode.CompletionItemKind.Property },
					{ label: "/glob", kind: vscode.CompletionItemKind.Property },
					{ label: "/method", kind: vscode.CompletionItemKind.Property },
					{ label: "/path", kind: vscode.CompletionItemKind.Property },
					{ label: "/protocol", kind: vscode.CompletionItemKind.Property },
					{ label: "/query", kind: vscode.CompletionItemKind.Property },
					{ label: "/selectors", kind: vscode.CompletionItemKind.Property },
					{ label: "/suffix", kind: vscode.CompletionItemKind.Property },
					{ label: "/type", kind: vscode.CompletionItemKind.Property },
					{ label: "/url", kind: vscode.CompletionItemKind.Property }
				]
			}
		);
	});

	test("Filter Scope Autocompletion (via `filters` directory) - Global Scope Has Zero Autocompletion Suggestions", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/filters/filter.any");
		const cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(4, 0));

		assertZeroAutocompletionItemSuggestions(textEditor.document, cursorPosition);
	});

	test("Filter Scope Autocompletion (via `filters` directory) - Property '/type' Should Not Show in Autocompletion Suggestions for Filter '/0002'", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/filters/filter.any");
		const cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(8, 4));

		assertDoesNotContainAutocompletionItem(textEditor.document, cursorPosition, "/type");
	});

	test("Filter Scope Autocompletion (via `filters` directory) - Inline Filter '/0003' Shows Autocompletion Suggestions", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("autocompletion/filters/filter.any");
		const cursorPosition: vscode.Position = await simulateTypingProperty(textEditor, new vscode.Position(11, 32));

		await assertAutocompletionListContainsItems(
			textEditor.document,
			cursorPosition,
			{
				items: [
					{ label: "/extension", kind: vscode.CompletionItemKind.Property },
					{ label: "/glob", kind: vscode.CompletionItemKind.Property },
					{ label: "/method", kind: vscode.CompletionItemKind.Property },
					{ label: "/path", kind: vscode.CompletionItemKind.Property },
					{ label: "/protocol", kind: vscode.CompletionItemKind.Property },
					{ label: "/query", kind: vscode.CompletionItemKind.Property },
					{ label: "/selectors", kind: vscode.CompletionItemKind.Property },
					{ label: "/suffix-test", kind: vscode.CompletionItemKind.Property }
				]
			}
		);

		assertDoesNotContainAutocompletionItem(textEditor.document, cursorPosition, "/type");
		assertDoesNotContainAutocompletionItem(textEditor.document, cursorPosition, "/url");
	});
});
