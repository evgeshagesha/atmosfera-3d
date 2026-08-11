import { NextResponse } from "next/server";

import { formatTestegTelegramMessage } from "@/lib/testeg/format";
import {
  TESTEG_MAX_BODY_BYTES,
  testegCompleteSchema,
} from "@/lib/testeg/schema";
import { sendTelegramMessage } from "@/lib/notifications/telegram";

/** Primitive in-memory rate limit (per isolate) — same pattern as anketaeg. */
const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;

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
  if (contentLength > TESTEG_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  const rawText = await request.text().catch(() => "");
  if (!rawText) {
    return NextResponse.json({ ok: false, error: "empty_body" }, { status: 400 });
  }
  if (Buffer.byteLength(rawText, "utf8") > TESTEG_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = testegCompleteSchema.safeParse(rawJson);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_payload",
        details: parsed.error.issues.slice(0, 8).map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const sessionId = data.sessionId || data.result.sessionId;

  // Persist/log (CRM optional later). Never put tokens in NEXT_PUBLIC_*.
  console.info(
    "[testeg-complete]",
    JSON.stringify({
      sessionId,
      questionnaireId: data.questionnaireId || data.result.questionnaireId || null,
      total: data.result.total,
      level: data.result.level,
      rawLevel: data.result.rawLevel,
      priorityZone: data.result.priorityZone,
      safetyFlags: data.result.safetyFlags,
      duration: data.duration ?? null,
      utm: data.attribution || {},
    }),
  );

  const text = formatTestegTelegramMessage(data);
  const tg = await sendTelegramMessage({ text });

  if (!tg.ok && tg.reason === "not_configured") {
    console.info("[testeg-complete] telegram not_configured\n", text.slice(0, 2500));
    return NextResponse.json({
      ok: true,
      accepted: true,
      delivered: false,
      sessionId,
    });
  }

  if (!tg.ok) {
    // Result already accepted client-side; do not fail the user funnel on TG.
    console.error("[testeg-complete] telegram delivery failed");
    return NextResponse.json({
      ok: true,
      accepted: true,
      delivered: false,
      sessionId,
    });
  }

  return NextResponse.json({
    ok: true,
    accepted: true,
    delivered: true,
    sessionId,
  });
}
