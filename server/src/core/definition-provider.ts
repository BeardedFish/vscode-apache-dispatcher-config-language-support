/**
 * @fileoverview    Core logic for providing go to definition support for Apache Dispatcher Config files.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { INCLUDE_FUNCTION_NAME } from "@language-server/constants/function";
import { DocumentParserTreeManager } from "@language-server/core/document-parser-tree-manager";
import { ApacheDispatcherConfigToken, getCurrentSyntaxNode } from "@language-server/core/tree-sitter";
import { FileExistenceContext, getFileExistenceContext } from "@language-server/utils/file-system";
import { removeOuterQuotes } from "@language-server/utils/string";
import {
	DefinitionLink,
	DefinitionParams,
	LocationLink,
	Position,
	Range
} from "vscode-languageserver";
import Parser = require("web-tree-sitter");

const START_POSITION: Position = Position.create(0, 0);
const START_POSITION_RANGE: Range = Range.create(START_POSITION, START_POSITION);

export async function getDefinition(
	documentParserTreeManager: DocumentParserTreeManager,
	definitionParams: DefinitionParams
): Promise<DefinitionLink[] | undefined> {
	const currentSyntaxNode: Parser.SyntaxNode | undefined = getCurrentSyntaxNode(
		documentParserTreeManager.getDocumentTokenTree(definitionParams.textDocument.uri),
		definitionParams
	);

	if (currentSyntaxNode === undefined) {
		return undefined;
	}

	if (currentSyntaxNode.type === ApacheDispatcherConfigToken.String) {
		const currentSyntaxNodeParent: Parser.SyntaxNode | null = currentSyntaxNode.parent;

		if (currentSyntaxNodeParent === null) {
			return;
		}

		if (currentSyntaxNodeParent.type === ApacheDispatcherConfigToken.Function) {
			const functionName: string = currentSyntaxNodeParent.descendantsOfType(ApacheDispatcherConfigToken.FunctionName)[0].text;

			if (functionName === INCLUDE_FUNCTION_NAME) {
				const includeFilePath: string = removeOuterQuotes(currentSyntaxNode.text);
				const fileExistenceContext: FileExistenceContext = await getFileExistenceContext(definitionParams.textDocument.uri, includeFilePath);

				if (fileExistenceContext.exists) {
					return [
						LocationLink.create(
							`file:/${fileExistenceContext.uri}`,
							START_POSITION_RANGE,
							START_POSITION_RANGE,
							Range.create(
								Position.create(
									currentSyntaxNode.startPosition.row,
									currentSyntaxNode.startPosition.column
								),
								Position.create(
									currentSyntaxNode.endPosition.row,
									currentSyntaxNode.endPosition.column
								)
							)
						)
					];
				}
			}
		}
	}

	return undefined;
}
