"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONBOARDING_COOKIE, isOnboardingRoute, type OnboardingRoute } from "@/lib/onboarding";

export async function chooseOnboardingRoute(route: OnboardingRoute) {
  if (!isOnboardingRoute(route)) {
    redirect("/onboarding");
  }

  const jar = await cookies();
  jar.set(ONBOARDING_COOKIE, route, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/auth?from=onboarding");
}
