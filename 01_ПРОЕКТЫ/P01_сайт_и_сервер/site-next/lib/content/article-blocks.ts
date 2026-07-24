/** Portable article body — stored in `data/blog.json`, edited in TipTap. */

export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "heading"; level: 2 | 3; value: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "quote"; value: string }
  | { type: "list"; ordered: boolean; items: string[] };

export function articleBlocksToPlainText(blocks: ContentBlock[]): string {
  const parts: string[] = [];
  for (const block of blocks) {
    if (block.type === "text") parts.push(block.value);
    else if (block.type === "heading") parts.push(block.value);
    else if (block.type === "quote") parts.push(block.value);
    else if (block.type === "list") parts.push(block.items.join("\n"));
  }
  return parts.join("\n\n");
}

export function generateExcerptFromBlocks(blocks: ContentBlock[], title: string, max = 220): string {
  const plain = articleBlocksToPlainText(blocks).replace(/\s+/g, " ").trim();
  const source = plain || title;
  if (source.length <= max) return source;
  return `${source.slice(0, max - 1).trim()}…`;
}

export const EMPTY_CONTENT_BLOCK: ContentBlock = { type: "text", value: "" };

export function normalizeContentBlocks(blocks: ContentBlock[] | undefined): ContentBlock[] {
  if (!blocks?.length) return [EMPTY_CONTENT_BLOCK];
  return blocks;
}
