import { TEST_CONFIG } from "./config";
import type { TestDraft, TestResult } from "./types";

export function loadDraft(): TestDraft | null {
  try {
    const raw = localStorage.getItem(TEST_CONFIG.storageKey);
    if (!raw) return null;
    const draft = JSON.parse(raw) as TestDraft;
    return draft.version === TEST_CONFIG.version ? draft : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: TestDraft) {
  try { localStorage.setItem(TEST_CONFIG.storageKey, JSON.stringify(draft)); } catch { /* private mode */ }
}

export function clearDraft() {
  try { localStorage.removeItem(TEST_CONFIG.storageKey); } catch { /* private mode */ }
}

export function saveResult(result: TestResult) {
  try { localStorage.setItem(TEST_CONFIG.resultStorageKey, JSON.stringify(result)); } catch { /* private mode */ }
}

export function loadResult(): TestResult | null {
  try {
    const raw = localStorage.getItem(TEST_CONFIG.resultStorageKey);
    return raw ? JSON.parse(raw) as TestResult : null;
  } catch {
    return null;
  }
}
