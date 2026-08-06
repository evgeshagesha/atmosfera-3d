/**
 * Lightweight static + lead API server.
 * Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID from .env only — never exposed to client.
 */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT || 4177);
const HOST = process.env.HOST || "127.0.0.1";

loadEnv(path.join(ROOT, ".env"));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const recentFingerprints = new Map();
const RATE_WINDOW_MS = 15_000;

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clip(value, max) {
  const s = String(value ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function readBody(req, limit = 80_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(Object.assign(new Error("payload_too_large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function validateLead(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, error: "Invalid payload" };
  }

  if (clip(data.honeypot, 200)) {
    return { ok: false, error: "Rejected", soft: true };
  }

  const name = clip(data.name, 80);
  const age = clip(data.age, 3);
  const city = clip(data.city, 80);
  const telegram = clip(data.telegram, 80);
  const phone = clip(data.phone, 40);
  const motivation = clip(data.motivation, 1000);

  if (!name || !age || !city) {
    return { ok: false, error: "Missing required fields" };
  }
  if (!telegram && !phone) {
    return { ok: false, error: "Contact required" };
  }
  if (!data.consent) {
    return { ok: false, error: "Consent required" };
  }
  if (!motivation) {
    return { ok: false, error: "Motivation required" };
  }

  return {
    ok: true,
    clean: {
      name,
      age,
      city,
      occupation: clip(data.occupation, 200),
      concerns: clip(data.concerns, 500),
      goal: clip(data.goal, 200),
      training: clip(data.training, 200),
      limits: clip(data.limits, 200),
      limitsDetail: clip(data.limitsDetail, 500),
      motivation,
      startWhen: clip(data.startWhen, 200),
      readiness: clip(data.readiness, 200),
      telegram,
      phone,
      sourcePage: clip(data.sourcePage, 120),
      pageUrl: clip(data.pageUrl, 500),
      submittedAt: clip(data.submittedAt, 64) || new Date().toISOString(),
      utm: data.utm && typeof data.utm === "object" ? data.utm : {},
      priceRub: Number(data.priceRub) || 30000,
      productTitle: clip(data.productTitle, 120),
      userAgent: clip(data.userAgent, 300),
    },
  };
}

function formatTelegramMessage(clean) {
  const utm =
    clean.utm && Object.keys(clean.utm).length
      ? Object.entries(clean.utm)
          .map(([k, v]) => `${k}=${v}`)
          .join(" | ")
      : "—";

  const lines = [
    "<b>Новая заявка — персональная стратегия тела</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(clean.name)}`,
    `<b>Возраст:</b> ${escapeHtml(clean.age)}`,
    `<b>Город:</b> ${escapeHtml(clean.city)}`,
    `<b>Деятельность:</b> ${escapeHtml(clean.occupation || "—")}`,
    `<b>Главный запрос:</b> ${escapeHtml(clean.concerns || "—")}`,
    `<b>Цель:</b> ${escapeHtml(clean.goal || "—")}`,
    `<b>Тренировочный опыт:</b> ${escapeHtml(clean.training || "—")}`,
    `<b>Ограничения:</b> ${escapeHtml(clean.limits || "—")}`,
  ];

  if (clean.limitsDetail) {
    lines.push(`<b>Ограничения (детали):</b> ${escapeHtml(clean.limitsDetail)}`);
  }

  lines.push(
    `<b>Почему сейчас:</b> ${escapeHtml(clean.motivation)}`,
    `<b>Когда готов начать:</b> ${escapeHtml(clean.startWhen || "—")}`,
    `<b>Готовность к стоимости:</b> ${escapeHtml(clean.readiness || "—")}`,
    `<b>Telegram:</b> ${escapeHtml(clean.telegram || "—")}`,
    `<b>Телефон:</b> ${escapeHtml(clean.phone || "—")}`,
    `<b>Источник:</b> ${escapeHtml(clean.sourcePage || "—")}`,
    `<b>UTM:</b> ${escapeHtml(utm)}`,
    `<b>URL:</b> ${escapeHtml(clean.pageUrl || "—")}`,
    "",
    `<i>${escapeHtml(new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }))}</i>`,
  );

  return lines.join("\n");
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, reason: "not_configured" };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "unknown");
    console.error("[telegram]", errText);
    return { ok: false, reason: "api_error" };
  }

  return { ok: true };
}

function fingerprint(req, clean) {
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.socket.remoteAddress || "";
  return `${ip}|${clean.telegram}|${clean.phone}|${clean.name}`;
}

function isRateLimited(fp) {
  const now = Date.now();
  for (const [key, ts] of recentFingerprints) {
    if (now - ts > RATE_WINDOW_MS) recentFingerprints.delete(key);
  }
  const prev = recentFingerprints.get(fp);
  if (prev && now - prev < RATE_WINDOW_MS) return true;
  recentFingerprints.set(fp, now);
  return false;
}

async function handleLead(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (err) {
    sendJson(res, err.status || 400, { ok: false, error: err.message || "Bad request" });
    return;
  }

  let data;
  try {
    data = JSON.parse(raw || "{}");
  } catch {
    sendJson(res, 400, { ok: false, error: "Invalid JSON" });
    return;
  }

  const validated = validateLead(data);
  if (!validated.ok) {
    if (validated.soft) {
      sendJson(res, 200, { ok: true, delivered: false });
      return;
    }
    sendJson(res, 400, { ok: false, error: validated.error });
    return;
  }

  if (isRateLimited(fingerprint(req, validated.clean))) {
    sendJson(res, 429, { ok: false, error: "Too many requests" });
    return;
  }

  const message = formatTelegramMessage(validated.clean);
  const result = await sendTelegram(message);

  if (!result.ok && result.reason === "not_configured") {
    console.info("[lead:not_configured]\n" + message.replace(/<[^>]+>/g, ""));
    sendJson(res, 200, { ok: true, delivered: false, warning: "telegram_not_configured" });
    return;
  }

  if (!result.ok) {
    sendJson(res, 502, { ok: false, error: "Delivery failed" });
    return;
  }

  sendJson(res, 200, { ok: true, delivered: true });
}

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const clean = decoded.replace(/^\/+/, "") || "index.html";
  if (clean.includes("\0") || clean.split("/").some((p) => p === "..")) return null;
  const full = path.normalize(path.join(root, clean));
  if (!full.startsWith(root)) return null;
  return full;
}

function serveStatic(req, res, urlPath) {
  let filePath = safeJoin(ROOT, urlPath);
  if (!filePath) {
    sendJson(res, 400, { ok: false, error: "Bad path" });
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  // Never serve env files
  const base = path.basename(filePath);
  if (base === ".env" || base.startsWith(".env.")) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `${HOST}:${PORT}`;
    const url = new URL(req.url || "/", `http://${host}`);

    if (url.pathname === "/api/lead" || url.pathname === "/api/lead/") {
      await handleLead(req, res);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    serveStatic(req, res, url.pathname);
  } catch (err) {
    console.error("[server]", err);
    sendJson(res, 500, { ok: false, error: "Server error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Landing ready: http://${HOST}:${PORT}/`);
  console.log(`Lead API:     POST http://${HOST}:${PORT}/api/lead`);
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.warn("Telegram not configured — leads will log to console (ok:true, delivered:false).");
  }
});
