/**
 * @fileoverview    Utility functions for dealing with cryptography.
 * @author          Darian Benam <darian@darianbenam.com>
 */

import { createHash } from "crypto";

export function convertValueToMd5Hash(value: string): string {
	return createHash("md5").update(value).digest("hex");
}
