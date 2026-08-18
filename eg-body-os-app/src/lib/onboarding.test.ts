import { describe, expect, it } from "vitest";
import { todayActionFor } from "@/lib/onboarding";

describe("todayActionFor", () => {
  it("maps diagnose to the test placeholder", () => {
    expect(todayActionFor("diagnose").cta).toBe("Пройти тест");
  });

  it("falls back to the functional test CTA", () => {
    expect(todayActionFor(undefined).cta).toBe("Пройти функциональный тест");
  });
});
