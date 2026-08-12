type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  openLink?: (url: string) => void;
  openTelegramLink?: (url: string) => void;
};

export function getTelegramWebApp(): TelegramWebApp | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }
  ).Telegram?.WebApp;
}

export function bootTelegramWebApp() {
  const wa = getTelegramWebApp();
  if (!wa) return;
  wa.ready();
  wa.expand();
  wa.setHeaderColor?.("#050505");
  wa.setBackgroundColor?.("#050505");
}

export function openExternalUrl(url: string) {
  const wa = getTelegramWebApp();
  if (wa?.openTelegramLink && url.startsWith("https://t.me/")) {
    wa.openTelegramLink(url);
    return;
  }
  if (wa?.openLink) {
    wa.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
