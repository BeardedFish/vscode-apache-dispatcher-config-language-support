import * as path from "path";
import * as vscode from "vscode";
import { sleep } from "./misc";

const TEST_CONFIGURATION_WORKSPACE: string = path.resolve(__dirname, "../../workspace/");

export async function activateApacheDispatcherConfigExtension(
	sourceCodeDirectory: string | undefined = undefined
): Promise<void> {
	const uri: vscode.Uri = vscode.Uri.file(sourceCodeDirectory || TEST_CONFIGURATION_WORKSPACE);

	await vscode.commands.executeCommand("vscode.openFolder", uri);

	const extension: vscode.Extension<unknown> | undefined = vscode.extensions.getExtension("darian-benam.vscode-apache-dispatcher-config-language-support")!;

	if (extension === undefined) {
		return;
	}

	await extension.activate();

	// Wait for the Apache Dispatcher Config language server process to initialize
	await sleep(2000);
}

export async function openDocumentByRelativeUri(uri: string): Promise<vscode.TextEditor> {
	const textDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(path.resolve(TEST_CONFIGURATION_WORKSPACE, uri));
	const textEditor: vscode.TextEditor = await vscode.window.showTextDocument(textDocument);

	return textEditor;
}
