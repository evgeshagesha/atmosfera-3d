import { describe, expect, it } from "vitest";
import { canAccess, formatEntitlementExpiry, type EntitlementLike } from "@/lib/entitlements";

const now = new Date("2026-08-18T12:00:00.000Z");

function row(partial: Partial<EntitlementLike> & Pick<EntitlementLike, "resource">): EntitlementLike {
  return {
    status: "ACTIVE",
    startsAt: new Date("2026-01-01T00:00:00.000Z"),
    expiresAt: null,
    ...partial,
  };
}

describe("canAccess", () => {
  it("grants FREE when an ACTIVE open-ended entitlement exists", () => {
    expect(canAccess([row({ resource: "FREE" })], "FREE", now)).toBe(true);
  });

  it("never treats missing rows as access (NONE)", () => {
    expect(canAccess([], "ATMOSFERA_CLUB", now)).toBe(false);
  });

  it("denies EXPIRED and REVOKED", () => {
    expect(
      canAccess([row({ resource: "ATMOSFERA_CLUB", status: "EXPIRED" })], "ATMOSFERA_CLUB", now),
    ).toBe(false);
    expect(
      canAccess([row({ resource: "ATMOSFERA_CLUB", status: "REVOKED" })], "ATMOSFERA_CLUB", now),
    ).toBe(false);
  });

  it("denies a live-looking row whose expiresAt is in the past", () => {
    expect(
      canAccess(
        [
          row({
            resource: "BODY_FOUNDATION_COURSE",
            expiresAt: new Date("2026-01-01T00:00:00.000Z"),
          }),
        ],
        "BODY_FOUNDATION_COURSE",
        now,
      ),
    ).toBe(false);
  });

  it("does not leak access across resources", () => {
    expect(canAccess([row({ resource: "FREE" })], "EG_PRIVATE", now)).toBe(false);
  });
});

describe("formatEntitlementExpiry", () => {
  it("says бессрочно when expiresAt is null", () => {
    expect(formatEntitlementExpiry(null)).toBe("бессрочно");
  });
});
