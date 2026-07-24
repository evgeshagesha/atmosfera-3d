import { getPageData } from "@/lib/pages";

const LEGACY_CSS_PREFIX = "/styles/legacy/css";

/** Map old Tilda asset paths to locally hosted legacy stylesheets. */
export function remapLegacyStylesheet(url: string): string {
  if (url.startsWith("/tilda/css/")) {
    return url.replace("/tilda/css/", `${LEGACY_CSS_PREFIX}/`);
  }
  return url;
}

export function getPageStylesheets(route: string): string[] {
  const page = getPageData(route);
  return (page.css ?? []).map(remapLegacyStylesheet);
}
