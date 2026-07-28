import { getBlogPosts } from "@/lib/content/blog";
import { buildBlogRssXml } from "@/lib/content/blog-rss";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  const posts = getBlogPosts();
  const xml = buildBlogRssXml(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
