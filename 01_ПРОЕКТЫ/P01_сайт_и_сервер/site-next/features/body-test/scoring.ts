import { LEVEL_COPY, TEST_CONFIG, ZONES } from "./config";
import { QUESTIONS } from "./questions";
import type {
  AnswerValue,
  LevelId,
  SafetyFlagId,
  TestAnswers,
  TestResult,
  ZoneId,
} from "./types";

function selectedOptions(questionId: string, value?: AnswerValue) {
  const question = QUESTIONS.find((item) => item.id === questionId);
  if (!question?.options || value === undefined) return [];
  const ids = Array.isArray(value) ? value : [String(value)];
  return question.options.filter((option) => ids.includes(option.id));
}

function levelForScore(score: number): LevelId {
  if (score >= TEST_CONFIG.thresholds.progression) return "progression";
  if (score >= TEST_CONFIG.thresholds.integration) return "integration";
  return "base";
}

export function calculateResult(
  answers: TestAnswers,
  context: { sessionId: string; questionnaireId?: string; utm?: Record<string, string> },
): TestResult {
  const zoneIds = Object.keys(ZONES) as ZoneId[];
  const zones = zoneIds.map((zoneId) => {
    const zoneQuestions = QUESTIONS.filter((item) => item.zone === zoneId);
    const score = zoneQuestions.reduce((total, question) => {
      const option = selectedOptions(question.id, answers[question.id])[0];
      return total + (option?.score ?? Math.round((question.maxScore ?? 0) / 2));
    }, 0);
    return { id: zoneId, label: ZONES[zoneId].label, score: Math.min(20, score), max: 20 as const };
  });

  const selections = QUESTIONS.flatMap((question) =>
    selectedOptions(question.id, answers[question.id]),
  );
  const safetyFlags = Array.from(
    new Set(selections.flatMap((option) => (option.safetyFlag ? [option.safetyFlag] : []))),
  ) as SafetyFlagId[];
  const asymmetry = selections.some((option) => option.asymmetry);
  const total = zones.reduce((sum, zone) => sum + zone.score, 0);
  const rawLevel = levelForScore(total);
  const hardFlags = new Set<SafetyFlagId>(TEST_CONFIG.hardSafetyFlags);
  const hasHardFlag = safetyFlags.some((flag) => hardFlags.has(flag));
  const level: LevelId = hasHardFlag
    ? "base"
    : safetyFlags.length > 0 && rawLevel === "progression"
      ? "integration"
      : rawLevel;
  const priorityZone = [...zones].sort((a, b) => a.score - b.score)[0].id;

  return {
    total,
    level,
    rawLevel,
    zones,
    priorityZone,
    asymmetry,
    safetyFlags,
    completedAt: new Date().toISOString(),
    sessionId: context.sessionId,
    questionnaireId: context.questionnaireId,
    attribution: context.utm,
  };
}

export function levelLabel(level: LevelId) {
  return LEVEL_COPY[level].title;
}
