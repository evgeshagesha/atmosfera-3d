import type { MetadataRoute } from "next";

import { getAllRoutes } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://egoshev.ru";
  const routes = ["", ...getAllRoutes()];

  return routes.map((route) => ({
    url: route === "" ? base : `${base}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
