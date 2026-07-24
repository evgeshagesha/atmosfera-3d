import type { JSONContent } from "@tiptap/core";

import type { ContentBlock } from "@/lib/content/article-blocks";

function inlineFromText(text: string): JSONContent[] {
  if (!text) return [];
  const lines = text.split("\n");
  const out: JSONContent[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 0) out.push({ type: "text", text: line });
    if (i < lines.length - 1) out.push({ type: "hardBreak" });
  }
  return out;
}

function paragraphNode(value: string): JSONContent {
  const inline = inlineFromText(value);
  if (inline.length === 0 || inline.every((node) => node.type === "hardBreak")) {
    return { type: "paragraph" };
  }
  return { type: "paragraph", content: inline };
}

export function contentBlocksToTiptapDoc(blocks: ContentBlock[]): JSONContent {
  const content: JSONContent[] = [];

  for (const block of blocks) {
    if (block.type === "text") {
      content.push(paragraphNode(block.value));
    } else if (block.type === "heading") {
      const level = block.level === 3 ? 3 : 2;
      const headingInline = inlineFromText(block.value);
      content.push(
        headingInline.length
          ? { type: "heading", attrs: { level }, content: headingInline }
          : { type: "paragraph" }
      );
    } else if (block.type === "image") {
      content.push(
        block.url?.trim()
          ? { type: "image", attrs: { src: block.url.trim(), alt: block.alt ?? "" } }
          : { type: "paragraph" }
      );
    } else if (block.type === "quote") {
      content.push({ type: "blockquote", content: [paragraphNode(block.value)] });
    } else if (block.type === "list") {
      const listType = block.ordered ? "orderedList" : "bulletList";
      const items = block.items.length ? block.items : [""];
      content.push({
        type: listType,
        content: items.map((item) => ({
          type: "listItem",
          content: [paragraphNode(item)],
        })),
      });
    }
  }

  return content.length
    ? { type: "doc", content }
    : { type: "doc", content: [{ type: "paragraph" }] };
}

function inlineToPlain(fragment: JSONContent[] | undefined): string {
  if (!fragment?.length) return "";
  const parts: string[] = [];
  for (const node of fragment) {
    if (node.type === "text" && typeof node.text === "string") parts.push(node.text);
    else if (node.type === "hardBreak") parts.push("\n");
  }
  return parts.join("");
}

function nodeToBlocks(node: JSONContent): ContentBlock[] {
  if (node.type === "paragraph") return [{ type: "text", value: inlineToPlain(node.content) }];
  if (node.type === "heading") {
    const level: 2 | 3 = node.attrs?.level === 3 ? 3 : 2;
    return [{ type: "heading", level, value: inlineToPlain(node.content) }];
  }
  if (node.type === "image") {
    const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
    const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
    return [{ type: "image", url: src, alt: alt || undefined }];
  }
  if (node.type === "blockquote") {
    const inner = node.content?.[0];
    if (inner?.type === "paragraph") {
      return [{ type: "quote", value: inlineToPlain(inner.content) }];
    }
    return [{ type: "quote", value: "" }];
  }
  if (node.type === "bulletList" || node.type === "orderedList") {
    const ordered = node.type === "orderedList";
    const items: string[] = [];
    for (const li of node.content || []) {
      if (li.type === "listItem" && li.content?.[0]?.type === "paragraph") {
        items.push(inlineToPlain(li.content[0].content));
      }
    }
    return [{ type: "list", ordered, items: items.length ? items : [""] }];
  }
  return [];
}

export function tiptapDocToContentBlocks(doc: JSONContent): ContentBlock[] {
  if (doc.type !== "doc" || !doc.content?.length) {
    return [{ type: "text", value: "" }];
  }
  const out: ContentBlock[] = [];
  for (const node of doc.content) out.push(...nodeToBlocks(node));
  return out.length ? out : [{ type: "text", value: "" }];
}
