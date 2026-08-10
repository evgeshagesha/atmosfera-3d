import { NextResponse } from "next/server";

import {
  anketaDocumentFilename,
  formatAnketaTelegramMessage,
} from "@/lib/anketa/format";
import {
  ANKETA_MAX_BODY_BYTES,
  anketaSubmitSchema,
} from "@/lib/anketa/schema";
import {
  sendTelegramDocument,
  sendTelegramMessage,
} from "@/lib/notifications/telegram";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > ANKETA_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  const rawText = await request.text().catch(() => "");
  if (!rawText) {
    return NextResponse.json({ ok: false, error: "Empty body" }, { status: 400 });
  }
  if (Buffer.byteLength(rawText, "utf8") > ANKETA_MAX_BODY_BYTES) {
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

  const parsed = anketaSubmitSchema.safeParse(rawJson);
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

  const message = formatAnketaTelegramMessage(data);
  const filename = anketaDocumentFilename(data);

  const messageResult = await sendTelegramMessage({ text: message });

  if (!messageResult.ok && messageResult.reason === "not_configured") {
    console.info(
      "[anketa-submit] not_configured\n",
      message,
      "\n---\n",
      data.summary.slice(0, 2000),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!messageResult.ok) {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  const documentResult = await sendTelegramDocument({
    filename,
    content: data.summary,
    caption: "Полная анкета приёма (anketa)",
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
