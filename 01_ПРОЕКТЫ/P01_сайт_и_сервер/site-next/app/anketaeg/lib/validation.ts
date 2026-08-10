import type { AnswerValue, Question } from "../types";

export function isFilled(
  question: Question,
  value: AnswerValue | undefined,
): boolean {
  if (!question.required) return true;
  if (question.type === "consent") return value === true;
  if (question.type === "matrix") {
    const rows = question.rows || [];
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return false;
    }
    return rows.every(
      (row) => typeof (value as Record<string, number>)[row.id] === "number",
    );
  }
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return typeof value === "number";
}
