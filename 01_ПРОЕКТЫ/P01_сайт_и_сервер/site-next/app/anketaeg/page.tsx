import type { Metadata } from "next";

import AnketaEgApp from "./components/AnketaEgApp";

const TITLE = "Исследование тела | Евгений Гошев";
const DESCRIPTION =
  "Персональное исследование состояния тела, движения, образа жизни и целей от Евгения Гошева.";
const CANONICAL = "https://eg.egoshev.ru/anketaeg";

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
  },
  robots: { index: false, follow: true },
};

export default function AnketaEgPage() {
  return <AnketaEgApp />;
}
