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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/tild6364-6163-4734-a134-626161373762/EG_atmosfera3D_stick.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/tild3632-6663-4164-b565-666631343131/photo_2025-05-13_135.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/tild6339-6439-4065-b437-383430633035/photo_2025-05-13_135.png"
        />
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
