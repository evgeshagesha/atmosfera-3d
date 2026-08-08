import fs from "fs";
import path from "path";

import {
  blogPostHref,
  ensureUniqueBlogSlug,
  normalizeBlogPost,
  resolveBlogSlug,
  type BlogPost,
} from "@/lib/content/blog-types";
import type { ContentBlock } from "@/lib/content/article-blocks";

export type { BlogPost, ContentBlock };
export {
  articleReadingMinutes,
  blogPostHref,
  ensureUniqueBlogSlug,
  normalizeBlogPost,
  resolveBlogSlug,
  slugifyBlogId,
  stripTildaSlugPrefix,
} from "@/lib/content/blog-types";

const BLOG_PATH = path.join(process.cwd(), "data/blog.json");

function readBlogData(): { posts: BlogPost[] } {
  const raw = fs.readFileSync(BLOG_PATH, "utf8");
  return JSON.parse(raw) as { posts: BlogPost[] };
}

function writeBlogData(data: { posts: BlogPost[] }): void {
  fs.writeFileSync(BLOG_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function migrateLegacyPost(raw: Record<string, unknown>): BlogPost {
  const title = String(raw.title ?? "");
  const legacyHref = String(raw.href ?? "");
  const slugFromHref = legacyHref.match(/\/blog\/([^/?#]+)/)?.[1];
  const legacySlug = String(raw.slug ?? slugFromHref ?? raw.id ?? "");
  const content =
    Array.isArray(raw.content) && raw.content.length
      ? (raw.content as ContentBlock[])
      : raw.excerpt
        ? [{ type: "text" as const, value: String(raw.excerpt) }]
        : [{ type: "text" as const, value: "" }];

  const stableId =
    String(raw.id ?? "").trim() ||
    String(raw.tildaUid ?? "").trim() ||
    resolveBlogSlug(title, legacySlug);

  return normalizeBlogPost({
    id: stableId,
    slug: legacySlug,
    title,
    excerpt: String(raw.excerpt ?? ""),
    image: String(raw.image ?? ""),
    category: raw.category ? String(raw.category) : undefined,
    seoTitle: raw.seoTitle ? String(raw.seoTitle) : undefined,
    content,
    published: raw.published !== false,
    publishedAt: String(raw.publishedAt ?? raw.updatedAt ?? new Date().toISOString()),
    updatedAt: String(raw.updatedAt ?? new Date().toISOString()),
    tildaUid: raw.tildaUid ? String(raw.tildaUid) : undefined,
  });
}

function assignUniqueSlugs(posts: BlogPost[]): BlogPost[] {
  const used = new Set<string>();

  return posts.map((post) => {
    const slug = ensureUniqueBlogSlug(post.slug, used);
    used.add(slug);
    return slug === post.slug ? post : { ...post, slug, href: blogPostHref(slug) };
  });
}

function loadPosts(): BlogPost[] {
  const data = readBlogData();
  const posts = data.posts.map((post) =>
    migrateLegacyPost(post as unknown as Record<string, unknown>)
  );
  return assignUniqueSlugs(posts);
}

/** Public surface: published flag + publishedAt not in the future (schedule via date). */
function isPubliclyVisible(post: BlogPost, nowMs = Date.now()): boolean {
  if (!post.published) return false;
  const at = Date.parse(post.publishedAt);
  if (Number.isNaN(at)) return true;
  return at <= nowMs;
}

export function getBlogPosts(): BlogPost[] {
  return loadPosts()
    .filter((post) => isPubliclyVisible(post))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getAllBlogPosts(): BlogPost[] {
  return loadPosts().sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return loadPosts().find((post) => post.id === id);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = loadPosts().find((item) => item.slug === slug);
  if (!post || !isPubliclyVisible(post)) return undefined;
  return post;
}

export function getAllBlogSlugs(): string[] {
  return loadPosts()
    .filter((post) => isPubliclyVisible(post))
    .map((post) => post.slug);
}

export function saveBlogPost(post: BlogPost): BlogPost {
  const data = readBlogData();
  const posts = assignUniqueSlugs(
    data.posts.map((item) => migrateLegacyPost(item as unknown as Record<string, unknown>))
  );
  const normalized = normalizeBlogPost(post);
  const index = posts.findIndex((item) => item.id === normalized.id);
  const otherSlugs = posts.filter((item) => item.id !== normalized.id).map((item) => item.slug);
  const slug = ensureUniqueBlogSlug(normalized.slug, otherSlugs);
  const final = { ...normalized, slug, href: blogPostHref(slug) };

  if (index === -1) {
    posts.unshift(final);
  } else {
    posts[index] = { ...final, publishedAt: posts[index].publishedAt || final.publishedAt };
  }

  writeBlogData({ posts: assignUniqueSlugs(posts) });
  return final;
}

export function deleteBlogPost(id: string): boolean {
  const data = readBlogData();
  const nextPosts = data.posts.filter((post) => post.id !== id);
  if (nextPosts.length === data.posts.length) return false;
  writeBlogData({ posts: nextPosts });
  return true;
}
