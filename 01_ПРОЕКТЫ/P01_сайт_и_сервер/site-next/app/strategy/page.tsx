import type { Metadata } from "next";

import StrategyLanding from "@/components/strategy/StrategyLanding";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";
import "./strategy.css";

const TITLE = STRATEGY_CONTENT.seo.title;
const DESCRIPTION = STRATEGY_CONTENT.seo.description;
const CANONICAL = STRATEGY_PRODUCT.pagePath;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "website",
    locale: "ru_RU",
    siteName: "Евгений Гошев | Атмосфера 3D",
    images: [{ url: STRATEGY_PRODUCT.heroImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: STRATEGY_PRODUCT.name,
  description: DESCRIPTION,
  url: STRATEGY_PRODUCT.canonicalUrl,
  provider: {
    "@type": "Person",
    name: "Евгений Гошев",
    jobTitle: "Специалист по комплексной работе с телом",
    url: "https://eg.egoshev.ru",
  },
  areaServed: ["Online", "Moscow"],
  offers: {
    "@type": "Offer",
    price: String(STRATEGY_PRODUCT.priceRub),
    priceCurrency: STRATEGY_PRODUCT.currency,
    availability: "https://schema.org/LimitedAvailability",
    url: STRATEGY_PRODUCT.canonicalUrl,
  },
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
