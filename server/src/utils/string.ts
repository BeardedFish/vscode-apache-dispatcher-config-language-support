/**
 * @fileoverview    Miscellaneous utility functions for dealing with strings.
 * @author          Darian Benam <darian@darianbenam.com>
 */

function isSingleQuoteString(text: string): boolean {
	return text.startsWith("'") && text.endsWith("'");
}

function isDoubleQuoteString(text: string): boolean {
	return text.startsWith("\"") && text.endsWith("\"");
}

export function removeOuterQuotes(text: string): string {
	if (isSingleQuoteString(text) || isDoubleQuoteString(text)) {
		return text.substring(1, text.length - 1);
	}

	return text;
}
