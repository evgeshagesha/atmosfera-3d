import type { Entitlement, EntitlementResource, EntitlementStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const RESOURCES = {
  FREE: "FREE",
  BODY_FOUNDATION_COURSE: "BODY_FOUNDATION_COURSE",
  COURSE_BREATHING_POSTURE: "COURSE_BREATHING_POSTURE",
  ATMOSFERA_CLUB: "ATMOSFERA_CLUB",
  PERSONAL_30: "PERSONAL_30",
  EG_PRIVATE: "EG_PRIVATE",
} as const;

export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

export const RESOURCE_LABELS: Record<Resource, string> = {
  FREE: "Базовый доступ",
  BODY_FOUNDATION_COURSE: "Базовая настройка тела",
  COURSE_BREATHING_POSTURE: "Дыхание и осанка",
  ATMOSFERA_CLUB: "Atmosfera 3D Club",
  PERSONAL_30: "Персональный маршрут",
  EG_PRIVATE: "EG Private",
};

export type EntitlementLike = {
  resource: EntitlementResource | Resource;
  status: EntitlementStatus | "ACTIVE" | "EXPIRED" | "REVOKED";
  startsAt: Date;
  expiresAt: Date | null;
};

/**
 * The only authorization check for product access.
 * Authentication (OTP session) is separate. Never use isPaid. Never query a bank.
 */
export function canAccess(
  entitlements: EntitlementLike[],
  resource: Resource,
  now: Date = new Date(),
): boolean {
  return entitlements.some((row) => isEntitlementLive(row, resource, now));
}

export function isEntitlementLive(
  row: EntitlementLike,
  resource: Resource,
  now: Date = new Date(),
): boolean {
  if (row.resource !== resource) return false;
  if (row.status !== "ACTIVE") return false;
  if (row.startsAt.getTime() > now.getTime()) return false;
  if (row.expiresAt && row.expiresAt.getTime() <= now.getTime()) return false;
  return true;
}

export function formatEntitlementExpiry(expiresAt: Date | null): string {
  if (!expiresAt) return "бессрочно";
  return `до ${expiresAt.toLocaleDateString("ru-RU")}`;
}

export async function grantSignupFreeEntitlement(userId: string): Promise<Entitlement> {
  const existing = await prisma.entitlement.findFirst({
    where: { userId, resource: "FREE", source: "SIGNUP" },
  });
  if (existing) return existing;

  return prisma.entitlement.create({
    data: {
      userId,
      resource: "FREE",
      startsAt: new Date(),
      expiresAt: null,
      status: "ACTIVE",
      source: "SIGNUP",
    },
  });
}

export async function listEntitlementsForUser(userId: string): Promise<Entitlement[]> {
  return prisma.entitlement.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function userCanAccess(userId: string, resource: Resource): Promise<boolean> {
  const rows = await listEntitlementsForUser(userId);
  return canAccess(rows, resource);
}
