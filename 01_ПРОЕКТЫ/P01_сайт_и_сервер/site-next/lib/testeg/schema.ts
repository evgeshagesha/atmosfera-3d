import { z } from "zod";

const zoneSchema = z.object({
  id: z.string().max(40),
  label: z.string().max(120),
  score: z.number().min(0).max(20),
  max: z.literal(20),
});

const resultSchema = z.object({
  total: z.number().min(0).max(100),
  level: z.enum(["base", "integration", "progression"]),
  rawLevel: z.enum(["base", "integration", "progression"]),
  zones: z.array(zoneSchema).min(1).max(8),
  priorityZone: z.string().max(40),
  asymmetry: z.boolean(),
  safetyFlags: z.array(z.string().max(40)).max(20),
  completedAt: z.string().min(8).max(64),
  sessionId: z.string().min(8).max(120),
  questionnaireId: z.string().max(120).optional(),
  attribution: z.record(z.string().max(80), z.string().max(500)).optional(),
});

export const testegCompleteSchema = z.object({
  result: resultSchema,
  answers: z.record(
    z.string().max(80),
    z.union([
      z.string().max(500),
      z.number().min(0).max(100),
      z.array(z.string().max(120)).max(40),
    ]),
  ),
  attribution: z.record(z.string().max(80), z.string().max(500)).optional().default({}),
  questionnaireId: z.string().max(120).optional(),
  sessionId: z.string().min(8).max(120).optional(),
  startedAt: z.string().max(64).optional(),
  completedAt: z.string().max(64).optional(),
  duration: z.number().min(0).max(86_400).optional(),
  scores: z
    .object({
      total: z.number().optional(),
      level: z.string().optional(),
      rawLevel: z.string().optional(),
      zones: z.array(zoneSchema).optional(),
    })
    .optional(),
  safety: z.array(z.string().max(40)).max(20).optional(),
});

export type TestegCompletePayload = z.infer<typeof testegCompleteSchema>;

export const TESTEG_MAX_BODY_BYTES = 64_000;
