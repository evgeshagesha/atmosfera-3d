import type { Metadata, Viewport } from "next";
import SiteFonts from "@/components/seo/SiteFonts";
import TelegramWebAppBoot from "@/components/seo/TelegramWebAppBoot";
import YandexMetrika from "@/components/seo/YandexMetrika";
import "./globals.css";

const yandexVerification =
  process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim() || "7de87f27e271e778";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eg.egoshev.ru"),
  verification: { yandex: yandexVerification },
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "Атмосфера 3D — RSS для Дзена",
        },
      ],
    },
  },
};

/** iPhone + Telegram Mini App: safe-area, no horizontal overflow. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Favicon / apple-touch: app/favicon.ico, app/icon.png, app/apple-icon.png (EG mark) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <SiteFonts />
      </head>
      <body>
        <TelegramWebAppBoot />
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
