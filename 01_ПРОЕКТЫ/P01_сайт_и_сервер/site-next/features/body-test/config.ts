import type { LevelId, SafetyFlagId, ZoneId } from "./types";

export const TEST_CONFIG = {
  version: 1,
  route: "/testeg",
  storageKey: "eg:functional-body-test:v1",
  resultStorageKey: "eg:functional-body-test:result:v1",
  submitEndpoint: "/api/testeg/complete",
  autoAdvanceMs: 340,
  thresholds: {
    integration: 55,
    progression: 80,
  },
  resultUrls: {
    base: "/testeg/result/base",
    integration: "/testeg/result/integration",
    progression: "/testeg/result/progression",
  } satisfies Record<LevelId, string>,
  hardSafetyFlags: [
    "sharp_pain",
    "numbness",
    "dizziness",
    "loss_of_control",
  ] satisfies SafetyFlagId[],
} as const;

export const ZONES: Record<ZoneId, { label: string; short: string; number: string }> = {
  breath: { label: "Дыхание", short: "Дыхание", number: "01" },
  posture: { label: "Плечи и грудной отдел", short: "Плечи", number: "02" },
  pelvis: { label: "Таз и контроль", short: "Таз", number: "03" },
  movement: { label: "Качество движения", short: "Движение", number: "04" },
  legs: { label: "Ноги и стопы", short: "Опора", number: "05" },
};

export const LEVEL_COPY: Record<LevelId, { title: string; note: string }> = {
  base: {
    title: "БАЗА",
    note: "У тебя уже есть хорошая база, но несколько зон требуют внимания. Начни с них — и движение станет свободнее и увереннее.",
  },
  integration: {
    title: "ИНТЕГРАЦИЯ",
    note: "Тело уже хорошо справляется с базовыми движениями. Следующий шаг — соединить подвижность, контроль и устойчивость в единый навык.",
  },
  progression: {
    title: "ПРОГРЕССИЯ",
    note: "У тебя сильная функциональная основа. Теперь можно развивать качество движения и постепенно переходить к более сложным задачам.",
  },
};
