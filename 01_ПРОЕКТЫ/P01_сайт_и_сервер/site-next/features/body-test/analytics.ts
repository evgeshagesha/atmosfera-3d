export type AnalyticsEvent =
  | "test_view"
  | "test_start"
  | "test_resume"
  | "test_step_view"
  | "test_answer"
  | "test_video_open"
  | "test_complete"
  | "test_result_click"
  | "result_page_view"
  | "result_youtube_click"
  | "result_consultation_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    YM_COUNTER_ID?: number;
  }
}

const METRIKA_ID = 108157733;

/** Push to dataLayer + Yandex Metrika reachGoal (same pattern as anketaeg). */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const detail = { event, ...payload };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
  } catch {
    /* noop */
  }

  try {
    const id = window.YM_COUNTER_ID || METRIKA_ID;
    if (typeof window.ym === "function") {
      window.ym(id, "reachGoal", event, payload);
    }
  } catch {
    /* noop */
  }

  try {
    window.dispatchEvent(new CustomEvent("eg:analytics", { detail }));
  } catch {
    /* noop */
  }
}
