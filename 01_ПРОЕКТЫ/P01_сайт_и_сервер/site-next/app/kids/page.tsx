import { readFileSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import Script from "next/script";

import JsonLd from "@/components/seo/JsonLd";

import "./kids.css";

const TITLE =
  "Атмосфера 3D Kids Camp — детские занятия и программы выходного дня в Москве";
const DESCRIPTION =
  "Закрытые детские занятия и программы выходного дня в мини-группе до четырёх человек: естественное движение, координация, характер, прогулка и общение. Москва, Савёловская.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kids" },
  openGraph: {
    title: "Атмосфера 3D Kids Camp — Евгений Гошев",
    description: DESCRIPTION,
    url: "/kids",
    type: "website",
    locale: "ru_RU",
    siteName: "Евгений Гошев | Атмосфера 3D",
  },
  twitter: {
    card: "summary_large_image",
    title: "Атмосфера 3D Kids Camp — Евгений Гошев",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Атмосфера 3D Kids Camp",
  serviceType: "Закрытые детские занятия и программы выходного дня",
  areaServed: { "@type": "City", name: "Москва" },
  provider: {
    "@type": "Person",
    name: "Евгений Гошев",
    jobTitle:
      "Специалист по движению, физический терапевт, основатель студии «Атмосфера 3D»",
  },
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 7,
    suggestedMaxAge: 15,
  },
  offers: [
    {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "15000",
      name: "Атмосфера 3D Kids · Будни",
    },
    {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "17000",
      name: "Атмосфера 3D Kids · Выходные",
    },
  ],
});

/** Kids Camp landing — isolated from the main site and club. */
export default function KidsPage() {
  const markup = readFileSync(
    path.join(process.cwd(), "app", "kids", "kids-body.html"),
    "utf8",
  );

  return (
    <>
      {/* Montserrat нужен только Kids Camp — основной сайт на Oswald + Manrope */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap"
      />
      <JsonLd items={[JSON_LD]} />
      <div
        id="a3d-kids"
        className="kids-page"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <Script src="/kids/script.js" strategy="afterInteractive" />
    </>
  );
}
