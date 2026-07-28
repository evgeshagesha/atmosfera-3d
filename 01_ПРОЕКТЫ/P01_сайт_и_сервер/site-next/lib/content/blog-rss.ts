import type { ContentBlock } from "@/lib/content/article-blocks";
import type { BlogPost } from "@/lib/content/blog-types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eg.egoshev.ru";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function mimeFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

function paragraphsFromText(value: string): string {
  return value
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => `<p>${escapeXml(chunk).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

export function contentBlocksToRssHtml(blocks: ContentBlock[], coverUrl?: string): string {
  const parts: string[] = [];
  if (coverUrl) {
    parts.push(
      `<figure><img src="${escapeXml(absoluteUrl(coverUrl))}"/></figure>`
    );
  }

  for (const block of blocks) {
    if (block.type === "text") {
      parts.push(paragraphsFromText(block.value));
    } else if (block.type === "heading") {
      const tag = block.level === 3 ? "h3" : "h2";
      parts.push(`<${tag}>${escapeXml(block.value)}</${tag}>`);
    } else if (block.type === "quote") {
      parts.push(`<blockquote>${escapeXml(block.value)}</blockquote>`);
    } else if (block.type === "list") {
      const tag = block.ordered ? "ol" : "ul";
      const items = block.items.map((item) => `<li>${escapeXml(item)}</li>`).join("");
      parts.push(`<${tag}>${items}</${tag}>`);
    } else if (block.type === "image" && block.url) {
      const alt = block.alt ? ` alt="${escapeXml(block.alt)}"` : "";
      parts.push(
        `<figure><img src="${escapeXml(absoluteUrl(block.url))}"${alt}/></figure>`
      );
    }
  }

  return parts.join("");
}

function rfc822(dateIso: string): string {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export function buildBlogRssXml(posts: BlogPost[]): string {
  const items = posts
    .map((post) => {
      const link = absoluteUrl(post.href || `/blog/${post.slug}`);
      const cover = post.image ? absoluteUrl(post.image) : "";
      const html = contentBlocksToRssHtml(post.content || [], post.image);
      const category = post.category
        ? `\n      <category>${escapeXml(post.category)}</category>`
        : "";
      const enclosure = cover
        ? `\n      <enclosure url="${escapeXml(cover)}" type="${mimeFromUrl(cover)}"/>`
        : "";

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rfc822(post.publishedAt)}</pubDate>
      <author>Евгений Гошев</author>${category}
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>${enclosure}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Атмосфера 3D — блог Евгения Гошева</title>
    <link>${SITE_URL}</link>
    <description>Движение · Дыхание · Дисциплина. Статьи о биомеханике, восстановлении, осанке и системной работе с телом.</description>
    <language>ru</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
