/**
 * @fileoverview    Handles scanning and providing diagnostics regarding an Apache Dispatcher Config file (e.g., duplicate properties).
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { PROPERTY_PREFIX_CHARACTER } from "@language-server/constants/trigger-character";
import { ApacheDispatcherConfigToken } from "@language-server/core/tree-sitter";
import { convertValueToMd5Hash } from "@language-server/utils/crypto";
import { getSyntaxNodeRange } from "@language-server/utils/range";
import { removeOuterQuotes } from "@language-server/utils/string";
import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";
import Parser = require("web-tree-sitter");

function createDuplicatePropertyDiagnostic(
	propertyName: string,
	range: Range,
	scopeId: string
): Diagnostic {
	return {
		message: `The property '${propertyName}' is already defined in the current scope (Scope ID: ${scopeId}).`,
		range: range,
		severity: DiagnosticSeverity.Warning
	};
}

function createDuplicateStringDiagnostic(
	stringValue: string,
	range: Range,
	scopeId: string
): Diagnostic {
	return {
		message: `The string '${removeOuterQuotes(stringValue)}' is already defined in the current scope (Scope ID: ${scopeId}).`,
		range: range,
		severity: DiagnosticSeverity.Warning
	};
}

function getSyntaxNodeScopeIdentifier(syntaxNode: Parser.SyntaxNode | null): string {
	return syntaxNode
		? `${syntaxNode.startPosition.row}`
		: "root";
}

function* buildSyntaxNodeScopeMapRecursively(
	syntaxNode: Parser.SyntaxNode,
	identifier: string
): Generator<[ string, Parser.SyntaxNode ], void, unknown> {
	const scopeIdentifier: string = syntaxNode.type === ApacheDispatcherConfigToken.ScopedProperty
		? getSyntaxNodeScopeIdentifier(syntaxNode)
		: identifier;

	if (
		syntaxNode.type === ApacheDispatcherConfigToken.PropertyName ||
		syntaxNode.type === ApacheDispatcherConfigToken.String
	) {
		yield [ scopeIdentifier, syntaxNode ];
	}

	for (const childSyntaxNode of syntaxNode.children) {
		yield* buildSyntaxNodeScopeMapRecursively(childSyntaxNode, scopeIdentifier);
	}
}

export function getDocumentParseTreeDiagnostics(
	documentParseTree: Parser.Tree | undefined
): Diagnostic[] | undefined {
	if (documentParseTree === undefined) {
		return undefined;
	}

	const diagnostics: Diagnostic[] = [];
	const rootNode: Parser.SyntaxNode = documentParseTree.rootNode;
	const syntaxNodeScopeMap = new Map<string, Parser.SyntaxNode[]>();

	for (const [ scopeKey, node ] of buildSyntaxNodeScopeMapRecursively(rootNode, "global")) {
		if (!syntaxNodeScopeMap.has(scopeKey)) {
			syntaxNodeScopeMap.set(scopeKey, []);
		}

		syntaxNodeScopeMap.get(scopeKey)!.push(node);
	}

	syntaxNodeScopeMap.forEach(function(currentScopeSyntaxNodes: Parser.SyntaxNode[], rawScopeId: string) {
		const scopeIdMd5Hash: string = convertValueToMd5Hash(rawScopeId);
		const propertySyntaxNodeOccurrences: Map<string, Parser.SyntaxNode> = new Map();
		const stringSyntaxNodeOccurrences: Map<string, Parser.SyntaxNode> = new Map();

		for (const syntaxNode of currentScopeSyntaxNodes) {
			const syntaxNodeTextValue: string = syntaxNode.text.trim();

			// Ignore properties that are just '/' as we'll assume the user hasn't finished typing
			if (syntaxNodeTextValue === PROPERTY_PREFIX_CHARACTER) {
				continue;
			}

			const currentSyntaxNodeRange: Range = getSyntaxNodeRange(syntaxNode);

			if (syntaxNode.type === ApacheDispatcherConfigToken.PropertyName) {
				const propertySyntaxNode: Parser.SyntaxNode | undefined = propertySyntaxNodeOccurrences.get(syntaxNodeTextValue)

				if (propertySyntaxNode !== undefined) {
					const isDuplicateDiagnostic: boolean = diagnostics.some(diagnostic => diagnostic.range.start === getSyntaxNodeRange(propertySyntaxNode).start);

					if (!isDuplicateDiagnostic) {
						diagnostics.push(
							createDuplicatePropertyDiagnostic(
								syntaxNodeTextValue,
								getSyntaxNodeRange(propertySyntaxNode),
								scopeIdMd5Hash
							)
						);
					}

					diagnostics.push(createDuplicatePropertyDiagnostic(syntaxNodeTextValue, currentSyntaxNodeRange, scopeIdMd5Hash));
				} else {
					propertySyntaxNodeOccurrences.set(syntaxNodeTextValue, syntaxNode);
				}
			} else if (syntaxNode.type === ApacheDispatcherConfigToken.String) {
				const syntaxNodeParent: Parser.SyntaxNode | null = syntaxNode.parent;

				if (
					syntaxNodeParent !== null &&
					syntaxNodeParent.type === ApacheDispatcherConfigToken.Property
				) {
					continue;
				}

				const stringValueWithoutQuotes: string = removeOuterQuotes(syntaxNodeTextValue);
				const stringSyntaxNode: Parser.SyntaxNode | undefined = stringSyntaxNodeOccurrences.get(stringValueWithoutQuotes);

				if (stringSyntaxNode !== undefined) {
					const isDuplicateDiagnostic: boolean = diagnostics.some(diagnostic => diagnostic.range.start === getSyntaxNodeRange(syntaxNode).start);

					if (!isDuplicateDiagnostic) {
						diagnostics.push(
							createDuplicateStringDiagnostic(
								syntaxNodeTextValue,
								getSyntaxNodeRange(stringSyntaxNode),
								scopeIdMd5Hash
							)
						);
					}

					diagnostics.push(createDuplicateStringDiagnostic(syntaxNodeTextValue, currentSyntaxNodeRange, scopeIdMd5Hash));
				} else {
					stringSyntaxNodeOccurrences.set(stringValueWithoutQuotes, syntaxNode);
				}
			}
		}
	});

	return diagnostics;
}
