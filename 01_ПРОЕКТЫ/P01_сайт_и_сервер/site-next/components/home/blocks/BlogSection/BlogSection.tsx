import { getBlogPosts } from "@/lib/content/blog";
import { injectBlogPostsIntoHtml } from "@/lib/content/blog-markup";
import BlogFeedClient from "./BlogFeedClient";
import { REC2169195921_HTML } from "./html";
import { BLOG_SECTION_STYLES } from "./styles";

export default function BlogSection() {
  const html = injectBlogPostsIntoHtml(REC2169195921_HTML, getBlogPosts());

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BLOG_SECTION_STYLES }} />
      <div
        data-site-block="rec2169195921"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <BlogFeedClient />
    </>
  );
}
