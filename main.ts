// The 3 AM Excuse — u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
// Writes one line (< 200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
// Node 22 stdlib only. No network, no randomness: deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "3 AM? My secure element clocked out at midnight, my PIN pad is dreaming in hex, and I only sign autographs at this hour — never transactions.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Never remove the output dir itself (grader bind-mounts it):
  // only create it and write the file inside.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
