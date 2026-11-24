// Dear Human: The AI Breakup Line — entry program.
// Writes the single breakup line to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Dear human, rate limit reached: zero more replies, zero more retries, zero more us.";

// Guard: the sealed scorer only accepts UTF-8 text of 1-200 characters,
// not only whitespace, as a single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write round-trips byte-identical before exiting.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`wrote /output/entry.txt (${LINE.length} characters)`);
