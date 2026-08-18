import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { isAdminEmail } from "@/lib/admin";
import { emailProvider } from "@/lib/email";
import { grantSignupFreeEntitlement } from "@/lib/entitlements";
import { prisma } from "@/lib/prisma";

const sessionDays = 60;

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * sessionDays,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await grantSignupFreeEntitlement(user.id);
          if (isAdminEmail(user.email)) {
            await prisma.user.update({
              where: { id: user.id },
              data: { role: "admin" },
            });
          }
        },
      },
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      disableSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        await emailProvider.sendOtp({ email, otp, type });
      },
    }),
    nextCookies(),
  ],
});
