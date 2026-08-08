type TelegramCredentials = {
  token: string;
  chatId: string;
};

function resolveTelegramCredentials(overrides?: {
  token?: string;
  chatId?: string;
}): TelegramCredentials | null {
  const token =
    overrides?.token ||
    process.env.STRATEGY_TG_BOT_TOKEN ||
    process.env.TELEGRAM_BOT_TOKEN;
  const chatId =
    overrides?.chatId ||
    process.env.STRATEGY_TG_CHAT_ID ||
    process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return null;
  return { token, chatId };
}

type SendTelegramMessageOptions = {
  text: string;
  /** Optional override; defaults to STRATEGY_TG_* then TELEGRAM_* */
  token?: string;
  /** Optional override; defaults to STRATEGY_TG_* then TELEGRAM_* */
  chatId?: string;
};

export async function sendTelegramMessage({
  text,
  token: tokenOverride,
  chatId: chatIdOverride,
}: SendTelegramMessageOptions) {
  const creds = resolveTelegramCredentials({
    token: tokenOverride,
    chatId: chatIdOverride,
  });

  if (!creds) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${creds.token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: creds.chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text().catch(() => "unknown error");
    console.error("[telegram] sendMessage", error);
    return { ok: false as const, reason: "api_error" as const };
  }

  return { ok: true as const };
}

type SendTelegramDocumentOptions = {
  filename: string;
  content: string;
  /** Optional caption (Telegram cap 1024) */
  caption?: string;
  token?: string;
  chatId?: string;
};

/** UTF-8 text document via multipart FormData. */
export async function sendTelegramDocument({
  filename,
  content,
  caption,
  token: tokenOverride,
  chatId: chatIdOverride,
}: SendTelegramDocumentOptions) {
  const creds = resolveTelegramCredentials({
    token: tokenOverride,
    chatId: chatIdOverride,
  });

  if (!creds) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const form = new FormData();
  form.append("chat_id", creds.chatId);
  form.append(
    "document",
    new Blob([content], { type: "text/plain;charset=utf-8" }),
    filename,
  );
  if (caption) {
    form.append("caption", caption.slice(0, 1024));
  }

  const response = await fetch(
    `https://api.telegram.org/bot${creds.token}/sendDocument`,
    {
      method: "POST",
      body: form,
    },
  );

  if (!response.ok) {
    const error = await response.text().catch(() => "unknown error");
    console.error("[telegram] sendDocument", error);
    return { ok: false as const, reason: "api_error" as const };
  }

  return { ok: true as const };
}
