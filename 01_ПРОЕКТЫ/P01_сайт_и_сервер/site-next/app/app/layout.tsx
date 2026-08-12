import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Атмосфера 3D · Навигация",
  description: "С чего начать: анкета, очная практика в Москве, отзывы.",
  robots: { index: false, follow: false },
};

export default function MiniAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </>
  );
}
