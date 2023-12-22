/**
 * @fileoverview    Main entrypoint of the Apache Dispatcher Config Language Support for Visual Studio Code client extension.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { setupLanguageServerClient } from "@client/core/language-server-client";
import * as path from "path";
import { ExtensionContext } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
	client = setupLanguageServerClient(
		path.join("server", "dist", "server.js"),
		context
	);
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}

	return client.stop();
}
