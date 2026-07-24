import { NextResponse } from "next/server";

import { formatContactSubmission } from "@/lib/contact/format-submission";
import { sendTelegramMessage } from "@/lib/notifications/telegram";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const data = body as Record<string, FormDataEntryValue>;
  const message = formatContactSubmission(data);

  const result = await sendTelegramMessage({ text: message });

  if (!result.ok && result.reason === "not_configured") {
    console.info("[contact]", message);
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
