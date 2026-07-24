import { getPageData } from "@/lib/pages";

/** Homepage is fully React — no legacy artboard scripts. */
const ROUTES_WITHOUT_ARTBOARD = new Set([""]);

/** Extract only artboard layout init calls from legacy page scripts. */
export function getArtboardInitScripts(route: string): string[] {
  if (ROUTES_WITHOUT_ARTBOARD.has(route)) {
    return [];
  }

  const page = getPageData(route);
  const scripts = page.scripts ?? [];

  return scripts.filter((code) => code.includes("t396_init"));
}
