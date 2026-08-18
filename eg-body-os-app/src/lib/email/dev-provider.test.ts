import { describe, expect, it, vi } from "vitest";
import { DevEmailProvider, peekDevOtp } from "@/lib/email/dev-provider";

describe("DevEmailProvider", () => {
  it("logs the OTP and stores it for the dev peek endpoint", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const provider = new DevEmailProvider();
    const email = `slice0-${Date.now()}@example.com`;

    await provider.sendOtp({ email, otp: "654321", type: "sign-in" });

    expect(log.mock.calls.some((call) => String(call[0]).includes("654321"))).toBe(true);
    expect(await peekDevOtp(email)).toBe("654321");
    log.mockRestore();
  });
});
