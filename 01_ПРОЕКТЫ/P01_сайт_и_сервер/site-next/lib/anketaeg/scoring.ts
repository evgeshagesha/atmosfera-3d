import type {
  AnketaAnswers,
  LeadScoreResult,
  LeadTemperature,
} from "@/app/anketaeg/types";

/**
 * Server-authoritative lead score (TZ §17).
 * Do not trust client-sent score — always recalculate here.
 */
export function calculateLeadScore(answers: AnketaAnswers): LeadScoreResult {
  let score = 0;

  if (answers.pain_duration === "over_2y") score += 2;
  if (answers.pain_duration === "cant_remember") score += 3;

  if (answers.max_spend === "30-100k") score += 2;
  if (answers.max_spend === "100k_plus") score += 3;

  if (
    Array.isArray(answers.barriers) &&
    answers.barriers.includes("dont_know_start")
  ) {
    score += 2;
  }

  if (typeof answers.readiness === "number" && answers.readiness >= 8) {
    score += 2;
  }

  if (
    ["personal_online", "consultations", "offline", "hybrid"].includes(
      String(answers.work_format),
    )
  ) {
    score += 2;
  }

  if (answers.interview === "yes") score += 1;

  if (
    typeof answers.holistic_interest === "number" &&
    answers.holistic_interest >= 4
  ) {
    score += 1;
  }

  let segment: LeadTemperature;
  if (score >= 8) segment = "HOT";
  else if (score >= 4) segment = "WARM";
  else segment = "COLD";

  return { score, segment };
}
