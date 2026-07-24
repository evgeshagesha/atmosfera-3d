import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin/session";
import type { ContentBlock } from "@/lib/content/article-blocks";
import {
  deleteBlogPost,
  getAllBlogPosts,
  normalizeBlogPost,
  saveBlogPost,
  ensureUniqueBlogSlug,
  slugifyBlogId,
  type BlogPost,
} from "@/lib/content/blog";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  return NextResponse.json({ ok: true, posts: getAllBlogPosts() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const data = body as Partial<BlogPost>;
  const title = String(data.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ ok: false, error: "Заполните заголовок" }, { status: 400 });
  }

  const existing = data.id ? getAllBlogPosts().find((post) => post.id === data.id) : undefined;
  const otherSlugs = getAllBlogPosts()
    .filter((post) => post.id !== data.id)
    .map((post) => post.slug);
  const baseSlug = slugifyBlogId(title);
  const slug = ensureUniqueBlogSlug(baseSlug, otherSlugs);

  const post = normalizeBlogPost({
    id: String(data.id ?? "").trim() || existing?.id || slug,
    slug,
    title,
    excerpt: String(data.excerpt ?? ""),
    image: String(data.image ?? ""),
    category: data.category ? String(data.category) : undefined,
    content: Array.isArray(data.content) ? (data.content as ContentBlock[]) : undefined,
    published: data.published !== false,
    publishedAt: existing?.publishedAt ?? String(data.publishedAt ?? new Date().toISOString()),
    updatedAt: new Date().toISOString(),
    tildaUid: data.tildaUid,
  });

  saveBlogPost(post);
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const deleted = deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
