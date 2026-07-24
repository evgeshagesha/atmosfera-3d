import type { Metadata, Viewport } from "next";
import SiteFonts from "@/components/seo/SiteFonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://egoshev.ru"),
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
        {children}
      </body>
    </html>
  );
}
