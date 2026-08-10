import { NextResponse } from "next/server";

import type { AnketaAnswers } from "@/app/anketaeg/types";
import { formatAnketaegTelegramMessages } from "@/lib/anketaeg/format";
import {
  ANKETAEG_MAX_BODY_BYTES,
  anketaegSubmitSchema,
} from "@/lib/anketaeg/schema";
import { calculateLeadScore } from "@/lib/anketaeg/scoring";
import { sendTelegramMessage } from "@/lib/notifications/telegram";

/** Primitive in-memory rate limit (per isolate). */
const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  row.count += 1;
  return row.count > RATE_MAX;
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > ANKETAEG_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  const rawText = await request.text().catch(() => "");
  if (!rawText) {
    return NextResponse.json({ ok: false, error: "Empty body" }, { status: 400 });
  }
  if (Buffer.byteLength(rawText, "utf8") > ANKETAEG_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = anketaegSubmitSchema.safeParse(rawJson);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        details: parsed.error.issues.slice(0, 8).map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: pretend success
  if (data.company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const answers = data.answers as AnketaAnswers;
  const name = answers.name;
  if (!name || (typeof name === "string" && !name.trim())) {
    return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
  }

  const telegram = answers.telegram;
  if (!telegram || (typeof telegram === "string" && !telegram.trim())) {
    return NextResponse.json(
      { ok: false, error: "Telegram required" },
      { status: 400 },
    );
  }

  if (answers.privacy !== true) {
    return NextResponse.json(
      { ok: false, error: "Consent required" },
      { status: 400 },
    );
  }

  // Never trust client lead score
  const lead = calculateLeadScore(answers);
  const chunks = formatAnketaegTelegramMessages({
    answers,
    lead,
    meta: {
      utm: (data.meta.utm || {}) as Record<string, string>,
      page: data.meta.page,
      referrer: data.meta.referrer ?? null,
      submittedAt: data.meta.submittedAt,
    },
  });

  let anyConfigured = false;
  for (const text of chunks) {
    const result = await sendTelegramMessage({ text });
    if (!result.ok && result.reason === "not_configured") {
      console.info("[anketaeg-submit] not_configured\n", text.slice(0, 2500));
      return NextResponse.json({
        ok: true,
        delivered: false,
        lead: { score: lead.score, segment: lead.segment },
      });
    }
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Delivery failed" },
        { status: 502 },
      );
    }
    anyConfigured = true;
  }

  return NextResponse.json({
    ok: true,
    delivered: anyConfigured,
    lead: { score: lead.score, segment: lead.segment },
  });
}
