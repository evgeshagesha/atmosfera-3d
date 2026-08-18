import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { EmailProvider, SendOtpInput } from "@/lib/email/types";

type Store = Record<string, { otp: string; at: string }>;

function storePath(): string {
  return path.join(tmpdir(), "eg-body-os-otp.json");
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(storePath(), "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    return {};
  }
}

async function writeStore(store: Store): Promise<void> {
  await mkdir(tmpdir(), { recursive: true });
  await writeFile(storePath(), JSON.stringify(store), "utf8");
}

/**
 * Slice 0 mailer: the app is not a mail server.
 * Logs the code and keeps a short-lived copy for the development UI.
 */
export class DevEmailProvider implements EmailProvider {
  async sendOtp({ email, otp, type }: SendOtpInput): Promise<void> {
    const normalized = email.trim().toLowerCase();
    console.info(`[DevEmailProvider] ${type} OTP for ${normalized}: ${otp}`);
    const store = await readStore();
    store[normalized] = { otp, at: new Date().toISOString() };
    await writeStore(store);
  }
}

export async function peekDevOtp(email: string): Promise<string | null> {
  const store = await readStore();
  return store[email.trim().toLowerCase()]?.otp ?? null;
}

export const devEmailProvider = new DevEmailProvider();
