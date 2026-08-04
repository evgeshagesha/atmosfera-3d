import type { MetadataRoute } from "next";

import { getAllBlogSlugs, getBlogPosts } from "@/lib/content/blog";
import { getAllRoutes } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  // Live Next host until apex DNS cutover. Override via NEXT_PUBLIC_SITE_URL.
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://eg.egoshev.ru";
  // Kids + SEO money landings are standalone App Router pages (outside Tilda manifest).
  const moneyRoutes = [
    "personalnye-trenirovki-moskva",
    "mfr-massazh-moskva",
    "funkcionalnye-trenirovki-moskva",
    "mobilnost",
    "osanka",
  ];
  const pageRoutes = ["", "blog", "kids", ...moneyRoutes, ...getAllRoutes()];
  const blogSlugs = getAllBlogSlugs();
  const posts = getBlogPosts();
  const postDates = Object.fromEntries(
    posts.map((post) => [post.slug, new Date(post.updatedAt || post.publishedAt)]),
  );
  const moneySet = new Set(moneyRoutes);

  const pages: MetadataRoute.Sitemap = pageRoutes.map((route) => ({
    url: route === "" ? base : `${base}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "blog" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "blog"
          ? 0.85
          : moneySet.has(route)
            ? 0.9
            : 0.7,
  }));

  const articles: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: postDates[slug] ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...articles];
}
