export type OtpType = "sign-in" | "email-verification" | "forget-password";

export type SendOtpInput = {
  email: string;
  otp: string;
  type: OtpType | string;
};

export interface EmailProvider {
  sendOtp(input: SendOtpInput): Promise<void>;
  peekDevOtp?(email: string): string | null;
}
