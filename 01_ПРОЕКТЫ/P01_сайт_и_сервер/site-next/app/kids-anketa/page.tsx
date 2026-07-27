import { readFileSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import Script from "next/script";

import "./anketa.css";

export const metadata: Metadata = {
  title: "Анкета — Атмосфера 3D Kids Camp",
  description:
    "Анкета для записи на детские программы Атмосфера 3D Kids Camp. Будни и выходные, мини-группа до четырёх детей.",
  alternates: { canonical: "/kids-anketa" },
  robots: { index: false, follow: false },
};

/** Kids questionnaire — isolated from the main site and club. */
export default function KidsAnketaPage() {
  const markup = readFileSync(
    path.join(process.cwd(), "app", "kids-anketa", "anketa-body.html"),
    "utf8",
  );

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap"
      />
      <div id="eg-anketa" dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/kids/anketa.js" strategy="afterInteractive" />
    </>
  );
}
