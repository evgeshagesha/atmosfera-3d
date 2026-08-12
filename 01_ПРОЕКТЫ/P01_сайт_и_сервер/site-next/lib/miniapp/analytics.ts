type TrackPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    YM_COUNTER_ID?: number;
  }
}

const METRIKA_ID = 108157733;
const SOURCE = "telegram_miniapp";

export function trackMiniapp(event: string, payload?: TrackPayload) {
  const detail = { event, source: SOURCE, ...payload };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
  } catch {
    /* noop */
  }
  try {
    const id = window.YM_COUNTER_ID || METRIKA_ID;
    if (typeof window.ym === "function") {
      window.ym(id, "reachGoal", event, { source: SOURCE, ...payload });
    }
  } catch {
    /* noop */
  }
}

export const MINIAPP_EVENTS = {
  view: "miniapp_view",
  anketa: "miniapp_anketa_click",
  studio: "miniapp_studio_click",
  reviews: "miniapp_reviews_click",
  instagram: "miniapp_instagram_click",
  youtube: "miniapp_youtube_click",
  telegram: "miniapp_telegram_click",
} as const;
