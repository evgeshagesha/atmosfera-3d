type TrackPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    YM_COUNTER_ID?: number;
  }
}

const METRIKA_ID = 108157733;

/** Push to dataLayer + Yandex Metrika reachGoal when available. */
export function trackAnketa(event: string, payload?: TrackPayload) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    /* noop */
  }

  try {
    const id = window.YM_COUNTER_ID || METRIKA_ID;
    if (typeof window.ym === "function") {
      window.ym(id, "reachGoal", event, payload || {});
    }
  } catch {
    /* noop */
  }
}

export const ANKETA_EVENTS = {
  view: "anketa_view",
  start: "anketa_start",
  step: "anketa_step",
  p25: "anketa_25",
  p50: "anketa_50",
  p75: "anketa_75",
  complete: "anketa_complete",
  testClick: "anketa_test_click",
} as const;
