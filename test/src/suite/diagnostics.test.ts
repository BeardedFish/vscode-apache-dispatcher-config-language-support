import * as assert from "assert";
import * as vscode from "vscode";
import {
	activateApacheDispatcherConfigExtension,
	openDocumentByRelativeUri
} from "../utils/extension";
import { sleep } from "../utils/misc";

const DIAGNOSTIC_SLEEP_TIMEOUT_MS = 500;

suite("Apache Dispatcher Config Language Support for Visual Studio Code Diagnostics Test Suite", () => {
	vscode.window.showInformationMessage("Running Diagnostics Tests...");

	setup(async () => {
		await activateApacheDispatcherConfigExtension();
	});

	teardown(async () => {
		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
	});

	test("2 Properties With Same Name Results in 2 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-1.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 2, true, `Expected exactly 2 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < 2; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/farm1' is already defined in the current scope (Scope ID: c81e728d9d4c2f636f067f89cc14862c).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("Removing 1 Duplicate Property Removes All Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-1.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		let diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnosticsInitial: number = diagnostics.length;

		assert.strictEqual(totalDiagnosticsInitial === 2, true, `Expected exactly 2 diagnostic warnings, found ${totalDiagnosticsInitial}`);

		await textEditor.edit(function(editBuilder: vscode.TextEditorEdit) {
			editBuilder.delete(new vscode.Range(new vscode.Position(4, 0), new vscode.Position(4, 13)));
		});

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		diagnostics = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnosticsAfterEdit: number = diagnostics.length;

		assert.strictEqual(totalDiagnosticsAfterEdit === 0, true, `Expected exactly 0 diagnostic warnings, found ${totalDiagnosticsInitial}`);
	});

	test("2 Properties With 1 Extra Definition Each Results in 4 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-2.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 4, true, `Expected exactly 4 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < 2; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/farm1' is already defined in the current scope (Scope ID: c81e728d9d4c2f636f067f89cc14862c).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}

		for (let i = 2; i < 4; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/farm2' is already defined in the current scope (Scope ID: c81e728d9d4c2f636f067f89cc14862c).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("Duplicate Property Diagnostic Warnings Are Contained In Their Respective Property Scope", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-3.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 6, true, `Expected exactly 6 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < 2; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/url' is already defined in the current scope (Scope ID: c81e728d9d4c2f636f067f89cc14862c).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}

		for (let i = 2; i < 4; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/extension' is already defined in the current scope (Scope ID: 1679091c5a880faf6fb5e6087eb1b2dc).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}

		for (let i = 4; i < 6; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/type' is already defined in the current scope (Scope ID: d3d9446802a44259755d38e6d163e820).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("6 Duplicate Properties Results in 6 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-4.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 6, true, `Expected exactly 6 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < totalDiagnostics; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/type' is already defined in the current scope (Scope ID: cfcd208495d565ef66e7dff9f98764da).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("25 Duplicate Properties Results in 25 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-properties-5.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 25, true, `Expected exactly 25 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < totalDiagnostics; i++) {
			assert.strictEqual(diagnostics[i].message, "The property '/type' is already defined in the current scope (Scope ID: cfcd208495d565ef66e7dff9f98764da).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("Pair of Duplicate Properties/Strings Results in 6 Diagnostic Warnings With 2 Scope IDs", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-property-string-pairs-1.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 6, true, `Expected exactly 6 diagnostic warnings, found ${totalDiagnostics}`);

		const clientHeadersDiagnosticMessage: string = "The property '/clientheaders' is already defined in the current scope (Scope ID: c4ca4238a0b923820dcc509a6f75849b).";

		assert.strictEqual(diagnostics[0].message, clientHeadersDiagnosticMessage);
		assert.strictEqual(diagnostics[0].severity, vscode.DiagnosticSeverity.Warning);

		const alreadyDefinedStringScopeOneDiagnosticMessage: string = "The string '*' is already defined in the current scope (Scope ID: c81e728d9d4c2f636f067f89cc14862c).";
		const alreadyDefinedStringScopeTwoDiagnosticMessage: string = "The string '*' is already defined in the current scope (Scope ID: 1679091c5a880faf6fb5e6087eb1b2dc).";

		assert.strictEqual(diagnostics[1].message, clientHeadersDiagnosticMessage);
		assert.strictEqual(diagnostics[1].severity, vscode.DiagnosticSeverity.Warning);

		assert.strictEqual(diagnostics[2].message, alreadyDefinedStringScopeOneDiagnosticMessage);
		assert.strictEqual(diagnostics[2].severity, vscode.DiagnosticSeverity.Warning);

		assert.strictEqual(diagnostics[3].message, alreadyDefinedStringScopeOneDiagnosticMessage);
		assert.strictEqual(diagnostics[3].severity, vscode.DiagnosticSeverity.Warning);

		assert.strictEqual(diagnostics[4].message, alreadyDefinedStringScopeTwoDiagnosticMessage);
		assert.strictEqual(diagnostics[4].severity, vscode.DiagnosticSeverity.Warning);

		assert.strictEqual(diagnostics[5].message, alreadyDefinedStringScopeTwoDiagnosticMessage);
		assert.strictEqual(diagnostics[5].severity, vscode.DiagnosticSeverity.Warning);
	});

	test("2 Strings With Same Value Results in 2 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-strings-1.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 2, true, `Expected exactly 2 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < 2; i++) {
			assert.strictEqual(diagnostics[i].message, "The string '${PUBLISH_DEFAULT_HOSTNAME}' is already defined in the current scope (Scope ID: 9c70933aff6b2a6d08c687a6cbb6b765).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("2 Strings With Same Value But With Different Quotation Marks Results in 2 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-strings-2.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 2, true, `Expected exactly 2 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < totalDiagnostics; i++) {
			assert.strictEqual(diagnostics[i].message, "The string '${PUBLISH_DEFAULT_HOSTNAME}' is already defined in the current scope (Scope ID: 9c70933aff6b2a6d08c687a6cbb6b765).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("25 Strings With Same Value Results in 25 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("diagnostics/duplicate-strings-3.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 25, true, `Expected exactly 25 diagnostic warnings, found ${totalDiagnostics}`);

		for (let i = 0; i < totalDiagnostics; i++) {
			assert.strictEqual(diagnostics[i].message, "The string 'authorization' is already defined in the current scope (Scope ID: 9c70933aff6b2a6d08c687a6cbb6b765).");
			assert.strictEqual(diagnostics[i].severity, vscode.DiagnosticSeverity.Warning);
		}
	});

	test("'dispatcher.any' File With 0 Duplicate Properties/Strings Has 0 Diagnostic Warnings", async () => {
		const textEditor: vscode.TextEditor = await openDocumentByRelativeUri("generic/dispatcher.any");
		const document: vscode.TextDocument = textEditor.document;

		await sleep(DIAGNOSTIC_SLEEP_TIMEOUT_MS);

		const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(document.uri);
		const totalDiagnostics: number = diagnostics.length;

		assert.strictEqual(totalDiagnostics === 0, true, `Expected exactly 0 diagnostic warnings, found ${totalDiagnostics}`);
	});
});
