import { z } from "zod";

/** Day-1 Zod: full submit payload for /anketa (приём). */
export const anketaSubmitSchema = z.object({
  version: z.number().int().positive().max(10),
  submittedAt: z.string().min(8).max(64),
  company_website: z.string().max(200).optional().default(""),
  consent: z.literal(true, {
    error: "Consent required",
  }),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(80),
  email: z.string().trim().max(120).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  format: z.string().trim().max(160).optional().default(""),
  request: z.string().trim().max(4000).optional().default(""),
  contactMethods: z.array(z.string().max(80)).max(20).optional().default([]),
  zones: z.string().trim().max(500).optional().default(""),
  whenStart: z.string().trim().max(160).optional().default(""),
  commitment: z.string().trim().max(20).optional().default(""),
  summary: z.string().min(20).max(250_000),
});

export type AnketaSubmitPayload = z.infer<typeof anketaSubmitSchema>;

export const ANKETA_MAX_BODY_BYTES = 400_000;
