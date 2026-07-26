#!/usr/bin/env node

import { createWriteStream, existsSync, readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const API_BASE_URL = "https://api.kie.ai";
const CREATE_TASK_PATH = "/api/v1/jobs/createTask";
const TASK_INFO_PATH = "/api/v1/jobs/recordInfo";
const OUTPUT_DIR = resolve("public/club/generated");
const DEFAULT_TIMEOUT_MS = 15 * 60 * 1000;

const HELP = `
Kie.ai media generator for the Atmosfera 3D club.

Usage:
  npm run kie:image -- --prompt "..." [--aspect 16:9] [--output name.png]
  npm run kie:video -- --prompt "..." --image-url "https://..." [--duration 5] [--output name.mp4]

Options:
  --prompt       Generation prompt (required)
  --image-url    Public PNG/JPEG URL (required for video)
  --aspect       Image aspect ratio (default: 16:9)
  --duration     Video duration: 5 or 10 seconds (default: 5)
  --output       Output filename inside public/club/generated
  --model        Override Kie.ai model
  --timeout      Maximum wait in seconds (default: 900)
  --dry-run      Validate and print request without calling Kie.ai
  --help         Show this help

Security:
  Put KIE_API_KEY in .env.local. Never commit or paste the key into code.
`;

function loadLocalEnv() {
  const envPath = resolve(".env.local");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

function parseArgs(argv) {
  const [mode, ...rest] = argv;
  const options = {};

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (!arg.startsWith("--")) {
      throw new Error(`Unknown argument: ${arg}`);
    }

    const key = arg.slice(2);
    if (key === "dry-run" || key === "help") {
      options[key] = true;
      continue;
    }

    const value = rest[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    options[key] = value;
    i += 1;
  }

  return { mode, options };
}

function validate({ mode, options }) {
  if (options.help || mode === "--help" || mode === "help") return;
  if (!["image", "video"].includes(mode)) {
    throw new Error('Mode must be "image" or "video".');
  }
  if (!options.prompt) throw new Error("--prompt is required.");
  if (mode === "video" && !options["image-url"]) {
    throw new Error("--image-url is required for video generation.");
  }
  if (mode === "video" && !["5", "10"].includes(options.duration ?? "5")) {
    throw new Error("--duration must be 5 or 10 seconds.");
  }
}

function buildTask({ mode, options }) {
  if (mode === "image") {
    return {
      model: options.model ?? "google/nano-banana",
      input: {
        prompt: options.prompt,
        output_format: "png",
        aspect_ratio: options.aspect ?? "16:9",
      },
    };
  }

  return {
    model: options.model ?? "kling-2.6/image-to-video",
    input: {
      prompt: options.prompt,
      image_urls: [options["image-url"]],
      sound: false,
      duration: options.duration ?? "5",
    },
  };
}

function apiErrorMessage(status, body) {
  const code = body?.code ?? status;
  const message = body?.msg ?? `HTTP ${status}`;
  if (code === 401) return "Kie.ai rejected the API key (401).";
  if (code === 402) return "Kie.ai balance is insufficient (402).";
  if (code === 429) return "Kie.ai rate limit exceeded (429).";
  return `Kie.ai error ${code}: ${message}`;
}

async function apiRequest(path, apiKey, init = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`Kie.ai returned invalid JSON (HTTP ${response.status}).`);
  }

  if (!response.ok || body.code !== 200) {
    throw new Error(apiErrorMessage(response.status, body));
  }
  return body;
}

async function createTask(task, apiKey) {
  const body = await apiRequest(CREATE_TASK_PATH, apiKey, {
    method: "POST",
    body: JSON.stringify(task),
  });
  const taskId = body?.data?.taskId;
  if (!taskId) throw new Error("Kie.ai did not return taskId.");
  return taskId;
}

function parseResultUrls(resultJson) {
  if (!resultJson) return [];
  let parsed;
  try {
    parsed = typeof resultJson === "string" ? JSON.parse(resultJson) : resultJson;
  } catch {
    throw new Error("Kie.ai returned malformed resultJson.");
  }
  return Array.isArray(parsed?.resultUrls) ? parsed.resultUrls : [];
}

async function waitForTask(taskId, apiKey, timeoutMs) {
  const startedAt = Date.now();
  let delayMs = 3_000;

  while (Date.now() - startedAt < timeoutMs) {
    const body = await apiRequest(
      `${TASK_INFO_PATH}?taskId=${encodeURIComponent(taskId)}`,
      apiKey,
    );
    const task = body?.data;
    const state = task?.state;

    if (state === "success") {
      const urls = parseResultUrls(task.resultJson);
      if (urls.length === 0) {
        throw new Error("Kie.ai task succeeded but returned no media URLs.");
      }
      return { urls, creditsConsumed: task.creditsConsumed };
    }
    if (state === "fail") {
      throw new Error(
        `Kie.ai generation failed: ${task.failMsg || task.failCode || "unknown error"}`,
      );
    }

    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    console.log(`Task ${state ?? "waiting"} · ${elapsed}s`);
    await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
    delayMs = Math.min(Math.round(delayMs * 1.35), 15_000);
  }

  throw new Error(`Generation timed out after ${Math.round(timeoutMs / 1000)}s.`);
}

function extensionFromType(contentType, fallbackUrl) {
  if (contentType?.includes("image/png")) return ".png";
  if (contentType?.includes("image/jpeg")) return ".jpg";
  if (contentType?.includes("image/webp")) return ".webp";
  if (contentType?.includes("video/mp4")) return ".mp4";
  const urlExtension = extname(new URL(fallbackUrl).pathname);
  return urlExtension && urlExtension.length <= 6 ? urlExtension : ".bin";
}

async function downloadMedia(url, requestedName, mode) {
  const response = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download generated media (HTTP ${response.status}).`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  const safeName = basename(
    requestedName || `kie-${mode}-${new Date().toISOString().replace(/[:.]/g, "-")}`,
  );
  const extension =
    extname(safeName) ||
    extensionFromType(response.headers.get("content-type"), url);
  const fileName = extname(safeName) ? safeName : `${safeName}${extension}`;
  const outputPath = resolve(OUTPUT_DIR, fileName);

  if (!outputPath.startsWith(`${OUTPUT_DIR}/`)) {
    throw new Error("Invalid output filename.");
  }

  await pipeline(Readable.fromWeb(response.body), createWriteStream(outputPath));
  return outputPath;
}

async function main() {
  loadLocalEnv();
  const parsed = parseArgs(process.argv.slice(2));
  validate(parsed);

  if (parsed.options.help || parsed.mode === "--help" || parsed.mode === "help") {
    console.log(HELP.trim());
    return;
  }

  const task = buildTask(parsed);
  if (parsed.options["dry-run"]) {
    console.log(JSON.stringify(task, null, 2));
    return;
  }

  const apiKey = process.env.KIE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "KIE_API_KEY is missing. Create .env.local and add KIE_API_KEY=your_key.",
    );
  }

  const timeoutSeconds = Number(parsed.options.timeout ?? 900);
  if (!Number.isFinite(timeoutSeconds) || timeoutSeconds < 30) {
    throw new Error("--timeout must be at least 30 seconds.");
  }

  console.log(`Submitting ${parsed.mode} task to ${task.model}...`);
  const taskId = await createTask(task, apiKey);
  console.log(`Task created: ${taskId}`);

  const result = await waitForTask(
    taskId,
    apiKey,
    Math.min(timeoutSeconds * 1000, DEFAULT_TIMEOUT_MS),
  );
  const outputPath = await downloadMedia(
    result.urls[0],
    parsed.options.output,
    parsed.mode,
  );

  console.log(`Saved: ${outputPath}`);
  if (result.creditsConsumed != null) {
    console.log(`Credits consumed: ${result.creditsConsumed}`);
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
