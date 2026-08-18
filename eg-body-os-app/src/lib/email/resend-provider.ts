import type { EmailProvider, SendOtpInput } from "@/lib/email/types";

export class ResendEmailProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
  ) {}

  async sendOtp({ email, otp }: SendOtpInput): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: [email],
        subject: "Код входа · Атмосфера 3D",
        text: `Ваш код: ${otp}\nДействует несколько минут. Если вы не запрашивали вход, просто проигнорируйте письмо.`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend failed: ${response.status} ${body}`);
    }
  }
}
