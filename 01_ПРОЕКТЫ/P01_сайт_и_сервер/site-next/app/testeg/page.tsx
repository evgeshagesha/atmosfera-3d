import type { Metadata } from "next";
import { BodyTest } from "@/features/body-test/BodyTest";

const TITLE = "Функциональный тест тела | Евгений Гошев";
const DESCRIPTION =
  "6 коротких двигательных проб и персональный профиль тела по пяти зонам за 5–7 минут.";
const CANONICAL = "https://eg.egoshev.ru/testeg";

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
  robots: { index: false, follow: false },
};

export default function TestEgPage() {
  return <BodyTest />;
}
