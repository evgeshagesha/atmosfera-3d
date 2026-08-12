import type { MetadataRoute } from "next";

import { getAllBlogSlugs, getBlogPosts } from "@/lib/content/blog";
import { getAllRoutes } from "@/lib/pages";

/** Match blog schedule: include posts as publishedAt becomes current. */
export const dynamic = "force-dynamic";
export const revalidate = 300;

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
    "strategy",
  ];
  // Legal App Router pages — ensure indexing even if manifest lags.
  const legalRoutes = ["oferta-consult"];
  const pageRoutes = [
    "",
    "blog",
    "kids",
    ...moneyRoutes,
    ...legalRoutes,
    ...getAllRoutes(),
  ];
  const blogSlugs = getAllBlogSlugs();
  const posts = getBlogPosts();
  const postDates = Object.fromEntries(
    posts.map((post) => [post.slug, new Date(post.updatedAt || post.publishedAt)]),
  );
  const moneySet = new Set(moneyRoutes);
  const legalSet = new Set(["oferta", "oferta-consult", "policy", "personal", ...legalRoutes]);

  // Deduplicate (manifest may already include oferta/policy/personal).
  const seen = new Set<string>();
  const uniqueRoutes = pageRoutes.filter((route) => {
    if (seen.has(route)) return false;
    seen.add(route);
    return true;
  });

  const pages: MetadataRoute.Sitemap = uniqueRoutes.map((route) => ({
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
            : legalSet.has(route)
              ? 0.4
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
