import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Атмосфера 3D · Mini App",
  description: "Евгений Гошев — о методе и программах Атмосфера 3D в Telegram",
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
