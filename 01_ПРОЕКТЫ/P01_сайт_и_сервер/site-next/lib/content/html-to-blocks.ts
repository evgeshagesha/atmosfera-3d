import type { ContentBlock } from "@/lib/content/article-blocks";

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function pushText(blocks: ContentBlock[], value: string) {
  const text = value.replace(/\u00a0/g, " ").trim();
  if (!text) return;
  const last = blocks[blocks.length - 1];
  if (last?.type === "text") {
    last.value = `${last.value}\n\n${text}`;
    return;
  }
  blocks.push({ type: "text", value: text });
}

/** Converts Tilda feed HTML (`t-redactor`) into portable content blocks. */
export function htmlToContentBlocks(html: string): ContentBlock[] {
  if (!html?.trim()) return [{ type: "text", value: "" }];

  const blocks: ContentBlock[] = [];
  let source = html;

  const images = [...source.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  for (const match of images) {
    const url = match[1];
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    blocks.push({ type: "image", url, alt: altMatch?.[1] || undefined });
    source = source.replace(match[0], "\n");
  }

  source = source
    .replace(/<\/(p|div|h2|h3|blockquote|li)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, inner) => {
      blocks.push({ type: "heading", level: 2, value: stripTags(inner) });
      return "\n";
    })
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, inner) => {
      blocks.push({ type: "heading", level: 3, value: stripTags(inner) });
      return "\n";
    })
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
      blocks.push({ type: "quote", value: stripTags(inner) });
      return "\n";
    });

  const listMatches = [...source.matchAll(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi)];
  for (const match of listMatches) {
    const ordered = match[1].toLowerCase() === "ol";
    const items = [...match[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((item) =>
      stripTags(item[1])
    );
    if (items.length) blocks.push({ type: "list", ordered, items });
    source = source.replace(match[0], "\n");
  }

  const paragraphs = source
    .split(/\n{2,}/)
    .map((chunk) => stripTags(chunk))
    .filter(Boolean);

  for (const paragraph of paragraphs) pushText(blocks, paragraph);

  return blocks.length ? blocks : [{ type: "text", value: "" }];
}
