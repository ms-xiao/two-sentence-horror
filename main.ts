import { mkdirSync, writeFileSync } from "node:fs";

// Two-Sentence Horror: exactly two sentences, 1-400 characters.
// The second sentence turns the first: she was never after the boy.
const STORY =
  "For three nights, my son has woken screaming that the woman under his bed is getting closer. Tonight he slept soundly — because she is under mine now.";

// Gate check mirroring the brief: exactly two sentences, 1-400 chars, not only whitespace.
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`expected 1-400 characters, got ${STORY.length}`);
}
if (!/\S/.test(STORY)) {
  throw new Error("entry must not be only whitespace");
}

// The gate counts sentences by terminal punctuation followed by a space,
// so the story keeps its single em dash inside sentence two and no
// abbreviations or decimal points that could split a sentence early.
// Normalize a trailing newline out of the file: the judge reads the raw
// bytes, and the story is exactly these two sentences, nothing after.
const TEXT = STORY.replace(/\r?\n$/, "");

console.log(TEXT);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");
