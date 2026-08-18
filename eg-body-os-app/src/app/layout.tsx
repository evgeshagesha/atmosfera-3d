import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { PhoneShell } from "@/components/os/PhoneShell";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["800"],
  variable: "--font-unbounded",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Атмосфера 3D",
  description: "Определи состояние тела и получи понятный маршрут действий.",
  applicationName: "Атмосфера 3D",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Атмосфера 3D",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-fg">
        <PhoneShell>{children}</PhoneShell>
      </body>
    </html>
  );
}
