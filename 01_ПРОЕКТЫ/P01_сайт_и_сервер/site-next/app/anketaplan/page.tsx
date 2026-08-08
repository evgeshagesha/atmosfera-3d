import type { Metadata } from "next";

import AnketaplanIsland from "@/components/anketaplan/AnketaplanIsland";

import "./anketaplan.css";

const TITLE = "Анкета для полноценного месячного плана";
const DESCRIPTION =
  "Конфиденциальная анкета клиента для персональной стратегии тела: здоровье, движение, сон, питание и реальные условия плана.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/anketaplan" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/anketaplan",
    type: "website",
    locale: "ru_RU",
    siteName: "Евгений Гошев | Атмосфера 3D",
  },
  robots: { index: false, follow: false },
};

export default function AnketaplanPage() {
  return <AnketaplanIsland />;
}
