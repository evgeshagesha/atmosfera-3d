"use client";

import { useEffect } from "react";

/**
 * When the site is opened as a Telegram Mini App, expand to full height
 * and mark <html> for safe-area / chrome tweaks.
 */
export default function TelegramWebAppBoot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const wa = (
        window as unknown as {
          Telegram?: {
            WebApp?: {
              ready: () => void;
              expand: () => void;
              setHeaderColor?: (c: string) => void;
              setBackgroundColor?: (c: string) => void;
              platform?: string;
            };
          };
        }
      ).Telegram?.WebApp;
      if (!wa) return;
      document.documentElement.classList.add("tg-mini-app");
      wa.ready();
      wa.expand();
      wa.setHeaderColor?.("#000000");
      wa.setBackgroundColor?.("#000000");
    };
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
