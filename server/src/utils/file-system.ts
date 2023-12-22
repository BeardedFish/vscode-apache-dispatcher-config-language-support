/**
 * @fileoverview    Utility functions for dealing file system operations.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import FileSystem = require("fs");
import * as path from "path";

export enum FileExtension {
	Markdown = ".md"
}

export function getFileNamesByExtensionInDirectory(directory: string, fileExtension: FileExtension): string[] {
	const itemsInDirectory: string[] = FileSystem.readdirSync(directory);
	const fileNames: string[] = [];

	for (const item of itemsInDirectory) {
		const fileAbsolutePath: string = path.join(directory, item);

		if (
			FileSystem.statSync(fileAbsolutePath).isDirectory() ||
			!fileAbsolutePath.endsWith(fileExtension)
		) {
			continue;
		}

		fileNames.push(item);
	}

	return fileNames;
}

export function readFileContent(filePath: string): Promise<string> {
	return new Promise((resolve, reject) => {
		FileSystem.readFile(filePath, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
}
