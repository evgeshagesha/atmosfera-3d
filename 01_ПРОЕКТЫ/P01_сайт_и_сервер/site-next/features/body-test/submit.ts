import { TEST_CONFIG } from "./config";
import type { TestDraft, TestResult } from "./types";

function durationSeconds(startedAt: string, completedAt: string): number | undefined {
  const start = Date.parse(startedAt);
  const end = Date.parse(completedAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return undefined;
  return Math.round((end - start) / 1000);
}

export async function submitResult(result: TestResult, draft: TestDraft) {
  const questionnaireId = draft.questionnaireId ?? result.questionnaireId;
  const duration = durationSeconds(draft.startedAt, result.completedAt);

  const response = await fetch(TEST_CONFIG.submitEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      result,
      answers: draft.answers,
      attribution: draft.utm,
      questionnaireId,
      sessionId: result.sessionId,
      startedAt: draft.startedAt,
      completedAt: result.completedAt,
      duration,
      scores: {
        total: result.total,
        level: result.level,
        rawLevel: result.rawLevel,
        zones: result.zones,
      },
      safety: result.safetyFlags,
    }),
  });
  if (!response.ok) throw new Error("Result submission failed");
}
