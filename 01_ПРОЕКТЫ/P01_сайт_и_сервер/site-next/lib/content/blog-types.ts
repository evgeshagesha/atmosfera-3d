import {
  articleBlocksToPlainText,
  generateExcerptFromBlocks,
  normalizeContentBlocks,
  type ContentBlock,
} from "@/lib/content/article-blocks";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
  content: ContentBlock[];
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  tildaUid?: string;
  href?: string;
};

const DEFAULT_IMAGE = "/assets/tild3262-6531-4035-b061-356538643261/IMG_1547_2.PNG";

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya",
};

export function blogPostHref(slug: string): string {
  return `/blog/${slug}`;
}

/** Tilda prefixes slugs with a short uid, e.g. `73mdd06yx1-mif-uglevodizhir`. */
const TILDA_SLUG_PREFIX = /^[a-z0-9]{6,12}-/i;

export function cleanBlogTitle(title: string): string {
  return title
    .replace(/^[\s"'«»]+|[\s"'«»]+$/g, "")
    .trim();
}

export function stripTildaSlugPrefix(slug: string): string {
  return slug.replace(TILDA_SLUG_PREFIX, "");
}

export function isTildaPrefixedSlug(slug: string): boolean {
  return TILDA_SLUG_PREFIX.test(slug);
}

export function slugifyBlogId(title: string): string {
  const transliterated = cleanBlogTitle(title)
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return transliterated || `post-${Date.now()}`;
}

export function resolveBlogSlug(title: string, rawSlug?: string): string {
  const fromTitle = slugifyBlogId(title);
  if (fromTitle && !fromTitle.startsWith("post-")) return fromTitle;

  const cleaned = stripTildaSlugPrefix(String(rawSlug ?? "").trim());
  return cleaned || fromTitle;
}

export function ensureUniqueBlogSlug(base: string, usedSlugs: Iterable<string>): string {
  const used = new Set(usedSlugs);
  if (!used.has(base)) return base;

  let index = 2;
  while (used.has(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}

export function normalizeBlogPost(raw: Partial<BlogPost> & { title: string }): BlogPost {
  const title = cleanBlogTitle(String(raw.title));
  const slug = resolveBlogSlug(title, raw.slug ?? raw.id);
  const id = String(raw.id ?? "").trim() || slug;
  const content = normalizeContentBlocks(raw.content);
  const excerpt =
    String(raw.excerpt ?? "").trim() || generateExcerptFromBlocks(content, title);
  const image = String(raw.image ?? "").trim() || DEFAULT_IMAGE;
  const publishedAt = String(raw.publishedAt ?? raw.updatedAt ?? new Date().toISOString());
  const updatedAt = String(raw.updatedAt ?? publishedAt);

  return {
    id,
    slug,
    title,
    excerpt,
    image,
    category: raw.category?.trim() || undefined,
    content,
    published: raw.published !== false,
    publishedAt,
    updatedAt,
    tildaUid: raw.tildaUid,
    href: blogPostHref(slug),
  };
}

export function articleReadingMinutes(blocks: ContentBlock[]): number {
  const words = articleBlocksToPlainText(blocks).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
