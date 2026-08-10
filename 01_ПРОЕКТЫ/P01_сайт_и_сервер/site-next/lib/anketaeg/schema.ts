import { z } from "zod";

const answerValueSchema = z.union([
  z.string().max(20_000),
  z.number().min(0).max(100),
  z.boolean(),
  z.array(z.string().max(500)).max(80),
  z.record(z.string().max(80), z.number().min(0).max(10)),
]);

export const anketaegSubmitSchema = z.object({
  company_website: z.string().max(200).optional().default(""),
  answers: z.record(z.string().max(80), answerValueSchema),
  meta: z
    .object({
      submittedAt: z.string().min(8).max(64),
      page: z.string().max(2000).optional().default(""),
      referrer: z.string().max(2000).nullable().optional(),
      utm: z.record(z.string().max(80), z.string().max(500)).optional().default({}),
      userAgent: z.string().max(1000).optional(),
      startedAt: z.string().max(64).nullable().optional(),
    })
    .optional()
    .default({
      submittedAt: new Date().toISOString(),
      page: "",
      referrer: null,
      utm: {},
    }),
  lead: z
    .object({
      score: z.number().optional(),
      segment: z.string().optional(),
    })
    .optional(),
});

export type AnketaegSubmitPayload = z.infer<typeof anketaegSubmitSchema>;

export const ANKETAEG_MAX_BODY_BYTES = 350_000;
