import type { Metadata } from "next";

import StrategyLanding from "@/components/strategy/StrategyLanding";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";
import "./strategy.css";

const TITLE = STRATEGY_CONTENT.seo.title;
const DESCRIPTION = STRATEGY_CONTENT.seo.description;
const OG_TITLE = STRATEGY_CONTENT.seo.ogTitle;
const OG_DESCRIPTION = STRATEGY_CONTENT.seo.ogDescription;
const CANONICAL = STRATEGY_PRODUCT.canonicalUrl;
const HOME = STRATEGY_PRODUCT.homeUrl;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: CANONICAL,
    type: "website",
    locale: "ru_RU",
    siteName: "Евгений Гошев | Атмосфера 3D",
    images: [
      {
        url: `${HOME}${STRATEGY_PRODUCT.heroImage}`,
        width: 819,
        height: 1024,
        alt: STRATEGY_CONTENT.hero.photoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [`${HOME}${STRATEGY_PRODUCT.heroImage}`],
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${HOME}/#website` },
      about: { "@id": `${CANONICAL}#service` },
      inLanguage: "ru-RU",
    },
    {
      "@type": "Service",
      "@id": `${CANONICAL}#service`,
      name: STRATEGY_PRODUCT.name,
      description: DESCRIPTION,
      url: CANONICAL,
      provider: {
        "@type": "Person",
        name: "Евгений Гошев",
        jobTitle: "Специалист по комплексной работе с телом",
        url: HOME,
      },
      areaServed: ["Online", "Moscow"],
      serviceType: "Персональная стратегия тела",
      offers: {
        "@type": "Offer",
        name: STRATEGY_PRODUCT.name,
        price: String(STRATEGY_PRODUCT.priceRub),
        priceCurrency: STRATEGY_PRODUCT.currency,
        availability: "https://schema.org/InStock",
        url: CANONICAL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: HOME,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Персональная стратегия тела",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function StrategyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <StrategyLanding />
    </>
  );
}
