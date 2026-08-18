import { NextRequest, NextResponse } from "next/server";
import { peekDevOtp } from "@/lib/email/dev-provider";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ otp: null }, { status: 400 });
  }

  const otp = await peekDevOtp(email);
  return NextResponse.json({ otp });
}
