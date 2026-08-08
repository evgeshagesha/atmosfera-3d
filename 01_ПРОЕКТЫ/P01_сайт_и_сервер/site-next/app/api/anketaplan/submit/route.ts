import { NextResponse } from "next/server";

import {
  anketaplanDocumentFilename,
  formatAnketaplanTelegramMessage,
} from "@/lib/anketaplan/format";
import {
  ANKETAPLAN_MAX_BODY_BYTES,
  anketaplanSubmitSchema,
  hasConsentInAnswers,
} from "@/lib/anketaplan/schema";
import {
  sendTelegramDocument,
  sendTelegramMessage,
} from "@/lib/notifications/telegram";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > ANKETAPLAN_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  const rawText = await request.text().catch(() => "");
  if (!rawText) {
    return NextResponse.json({ ok: false, error: "Empty body" }, { status: 400 });
  }
  if (Buffer.byteLength(rawText, "utf8") > ANKETAPLAN_MAX_BODY_BYTES) {
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

  const parsed = anketaplanSubmitSchema.safeParse(rawJson);
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

  // Honeypot: pretend success, do not notify
  if (data.company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!hasConsentInAnswers(data.answers)) {
    return NextResponse.json(
      { ok: false, error: "Consent required" },
      { status: 400 },
    );
  }

  const name = data.answers["Имя и фамилия"];
  const why = data.answers["Почему сейчас"];
  if (!name || (typeof name === "string" && !name.trim())) {
    return NextResponse.json(
      { ok: false, error: "Name required" },
      { status: 400 },
    );
  }
  if (!why || (typeof why === "string" && !why.trim())) {
    return NextResponse.json(
      { ok: false, error: "Motivation required" },
      { status: 400 },
    );
  }

  const message = formatAnketaplanTelegramMessage(data);
  const filename = anketaplanDocumentFilename(data);

  const messageResult = await sendTelegramMessage({ text: message });

  if (!messageResult.ok && messageResult.reason === "not_configured") {
    console.info("[anketaplan-submit] not_configured\n", message, "\n---\n", data.summary.slice(0, 2000));
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!messageResult.ok) {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  const documentResult = await sendTelegramDocument({
    filename,
    content: data.summary,
    caption: "Полный паспорт клиента (anketaplan)",
  });

  // both-or-502: message already sent — document must also succeed
  if (!documentResult.ok) {
    return NextResponse.json(
      { ok: false, error: "Document delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
