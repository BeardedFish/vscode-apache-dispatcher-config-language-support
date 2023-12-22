/**
 * @fileoverview    Core logic for running a Language Server client instance.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { ExtensionContext } from "vscode";
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";

export function setupLanguageServerClient(
	extensionServerPath: string,
	context: ExtensionContext
): LanguageClient {
	const serverModule: string = context.asAbsolutePath(extensionServerPath);

	const serverOptions: ServerOptions = {
		run: {
			module: serverModule,
			transport: TransportKind.ipc
		},
		debug: {
			module: serverModule,
			transport: TransportKind.ipc
		}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{
				scheme: "file",
				language: "apache-dispatcher-config"
			}
		]
	};

	const client: LanguageClient = new LanguageClient(
		"apacheDispatcherConfigLanguageServer",
		"Apache Dispatcher Config Language Server",
		serverOptions,
		clientOptions
	);

	client.start();

	return client;
}
