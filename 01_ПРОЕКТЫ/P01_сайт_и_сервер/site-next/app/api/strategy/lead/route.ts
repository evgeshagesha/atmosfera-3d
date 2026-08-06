import { NextResponse } from "next/server";

import { sendTelegramMessage } from "@/lib/notifications/telegram";
import {
  formatStrategyLeadMessage,
  normalizeLeadPayload,
  validateLeadPayload,
} from "@/lib/strategy/lead";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const data = normalizeLeadPayload(body);

  if (!data) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot: pretend success, do not notify
  if (data.company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const validationError = validateLeadPayload(data);
  if (validationError === "spam") {
    return NextResponse.json({ ok: true, delivered: false });
  }
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const message = formatStrategyLeadMessage(data);
  const result = await sendTelegramMessage({ text: message });

  if (!result.ok && result.reason === "not_configured") {
    console.info("[strategy-lead]", message);
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
