import type { Metadata } from "next";

import type { PageMeta } from "@/lib/pages";

export function buildPageMetadata(route: string, meta: PageMeta): Metadata {
  const path = route === "" ? "/" : `/${route}`;
  const isHome = route === "";

  return {
    title: meta.title,
    description: meta.description,
    keywords: isHome
      ? [
          "Евгений Гошев",
          "физический терапевт",
          "боли в спине",
          "биомеханика",
          "функциональные тренировки",
          "правИло",
          "массаж",
          "персональный тренер",
          "осанка",
          "Атмосфера 3D",
          "Москва",
        ]
      : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage] : undefined,
      url: path,
      type: "website",
      locale: "ru_RU",
      siteName: "Евгений Гошев | Атмосфера 3D",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
