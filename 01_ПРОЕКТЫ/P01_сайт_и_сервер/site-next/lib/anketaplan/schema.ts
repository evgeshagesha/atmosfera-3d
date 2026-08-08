import { z } from "zod";

const answerValueSchema = z.union([
  z.string().max(20_000),
  z.array(z.string().max(500)).max(80),
]);

/** Day-1 Zod: full submit payload. RHF skipped — controlled/vanilla island. */
export const anketaplanSubmitSchema = z.object({
  version: z.number().int().positive().max(10),
  submittedAt: z.string().min(8).max(64),
  company_website: z.string().max(200).optional().default(""),
  consent: z.literal(true, {
    error: "Consent required",
  }),
  answers: z.record(z.string().max(220), answerValueSchema),
  summary: z.string().min(20).max(250_000),
});

export type AnketaplanSubmitPayload = z.infer<typeof anketaplanSubmitSchema>;

export const ANKETAPLAN_MAX_BODY_BYTES = 400_000;

export function hasConsentInAnswers(
  answers: AnketaplanSubmitPayload["answers"],
): boolean {
  const value = answers["Согласие на обработку"];
  if (value === "Да") return true;
  if (Array.isArray(value) && value.includes("Да")) return true;
  return false;
}

export function answerAsString(
  answers: AnketaplanSubmitPayload["answers"],
  key: string,
): string {
  const value = answers[key];
  if (!value) return "";
  return Array.isArray(value) ? value.join(", ") : value;
}
