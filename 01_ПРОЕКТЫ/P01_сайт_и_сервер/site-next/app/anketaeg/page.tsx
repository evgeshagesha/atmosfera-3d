import type { Metadata } from "next";

import AnketaEgApp from "./components/AnketaEgApp";

const TITLE = "Персональная анкета | Евгений Гошев";
const DESCRIPTION =
  "Расскажите о себе и результате, к которому хотите прийти. Персональная анкета Евгения Гошева — около 7 минут, после заполнения доступ к функциональному тестированию тела.";
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
