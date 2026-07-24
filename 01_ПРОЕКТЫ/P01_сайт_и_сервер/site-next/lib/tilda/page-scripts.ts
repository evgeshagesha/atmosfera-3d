import { getPageData } from "@/lib/pages";

/** Inline init scripts from the original Tilda page, in source order. */
export function getPageInlineScripts(route: string): string[] {
  const page = getPageData(route);
  return page.scripts ?? [];
}
