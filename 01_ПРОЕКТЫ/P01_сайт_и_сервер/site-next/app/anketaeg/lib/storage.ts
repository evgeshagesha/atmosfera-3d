import type { AnketaAnswers, AnketaUtm } from "../types";

export const STORAGE_KEY = "eg_anketaeg_v2";

export type AnketaDraft = {
  answers: AnketaAnswers;
  index: number;
  started: boolean;
  startedAt: string | null;
  utm: AnketaUtm;
  landingUrl?: string;
  referrer?: string | null;
};

export function loadDraft(): AnketaDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<AnketaDraft>;
    if (!saved.answers || !Object.keys(saved.answers).length) return null;
    return {
      answers: saved.answers,
      index: Math.max(0, saved.index || 0),
      started: Boolean(saved.started),
      startedAt: saved.startedAt ?? null,
      utm: saved.utm || {},
      landingUrl: saved.landingUrl,
      referrer: saved.referrer ?? null,
    };
  } catch {
    return null;
  }
}

export function saveDraft(draft: AnketaDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* quota / private mode */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export function captureUtmFromLocation(): {
  utm: AnketaUtm;
  landingUrl: string;
  referrer: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  const utm: AnketaUtm = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return {
    utm,
    landingUrl: window.location.href,
    referrer: document.referrer || null,
  };
}
