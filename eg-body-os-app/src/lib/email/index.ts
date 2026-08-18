import { devEmailProvider } from "@/lib/email/dev-provider";
import { ResendEmailProvider } from "@/lib/email/resend-provider";
import type { EmailProvider } from "@/lib/email/types";

/**
 * App must not become a mail server.
 * Resend if RESEND_API_KEY is set; otherwise DevEmailProvider.
 * Production RU provider is later.
 */
export function createEmailProvider(): EmailProvider {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey) {
    const from =
      process.env.RESEND_FROM?.trim() || "Атмосфера 3D <noreply@example.com>";
    return new ResendEmailProvider(apiKey, from);
  }
  return devEmailProvider;
}

export const emailProvider = createEmailProvider();
