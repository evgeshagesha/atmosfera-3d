import type { BlogPost } from "@/lib/content/blog-types";
import { blogPostHref } from "@/lib/content/blog-types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderBlogPostItem(post: BlogPost, index: number): string {
  const href = blogPostHref(post.slug);
  return `<div class="t-feed__slider-grid__post-wrapper"><div class="t-feed__post t-slds__item js-feed-post t-align_left" data-slide-index="${index + 1}"><a href="${escapeHtml(href)}" class="t-feed__post-link"><div class="t-feed__post-imgwrapper t-feed__post-imgwrapper_4-3"><div class="t-feed__post-bgimg t-bgimg" style="background-image:url('${escapeHtml(post.image)}');"></div></div><div class="t-feed__post-title t-name t-name_md">${escapeHtml(post.title)}</div><div class="t-feed__post-descr t-descr t-descr_xxs">${escapeHtml(post.excerpt)}</div></a></div></div>`;
}

/** Injects SSR blog cards into the legacy t1004 carousel shell. */
export function injectBlogPostsIntoHtml(html: string, posts: BlogPost[]): string {
  const markup = posts.map(renderBlogPostItem).join("");

  return html
    .replace(
      /<div class="js-feed-preloader[\s\S]*?<!-- preloader els end -->/,
      ""
    )
    .replace(
      /(<div class="js-feed-container[^"]*"[^>]*id="carousel_2169195921"[^>]*>)\s*(<\/div>)/,
      `$1${markup}$2`
    )
    .replace('style="visibility: hidden;"', 'style="visibility: visible;"');
}
