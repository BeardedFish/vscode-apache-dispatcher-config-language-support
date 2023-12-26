/**
 * @fileoverview    A class that loads all Apache Dispatcher Config documentation files and allows easy access to
 *                  consumers.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import {
	FileExtension,
	getFileNamesByExtensionInDirectory,
	readFileContent
} from "@language-server/utils/file-system";
import * as path from "path";

export type OnDocumentationManagerInitializedCallback = (loadedDocumentationFilesCount: number) => void;

export class DocumentationManager {
	private parentDirectory: string;

	private documentation: Map<string, string>;

	constructor(
		parentDirectory: string
	) {
		this.parentDirectory = parentDirectory;
		this.documentation = new Map<string, string>();
	}

	private async loadDocumentation(): Promise<void> {
		const fileNames: string[] = getFileNamesByExtensionInDirectory(this.parentDirectory, FileExtension.Markdown);

		for (const fileName of fileNames) {
			try {
				const fileContent: string = await readFileContent(path.join(__dirname, "documentation", fileName));
				this.documentation.set(fileName, fileContent);
			} catch (error: unknown) {
				console.log(`Failed to load file '${fileName}'. Reason: ${error}`);
			}
		}
	}

	public async initialize(onInitializedCallback: OnDocumentationManagerInitializedCallback): Promise<void> {
		await this.loadDocumentation();
		onInitializedCallback.bind(this)(this.documentation.size);
	}

	public getDocumentationContent(id: string | undefined): string | undefined {
		if (id === undefined) {
			return undefined;
		}

		return this.documentation.get(id);
	}
}
