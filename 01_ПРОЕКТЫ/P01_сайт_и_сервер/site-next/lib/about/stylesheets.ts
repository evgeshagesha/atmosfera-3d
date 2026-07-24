import { remapLegacyStylesheet } from "@/lib/site/page-styles";

/** Legacy CSS set for `/about` — from data/about.json, paths remapped locally. */
const ABOUT_STYLESHEETS = [
  "/tilda/css/tilda-grid-3.0.min.css",
  "/tilda/css/tilda-blocks-page127139066.min.css",
  "/tilda/css/tilda-menusub-1.1.min.css",
  "/tilda/css/tilda-menu-widgeticons-1.0.min.css",
  "/tilda/css/tilda-menu-burger-1.0.min.css",
  "/tilda/css/tilda-slds-1.4.min.css",
  "/tilda/css/tilda-cover-1.0.min.css",
  "/tilda/css/tilda-zoom-2.0.min.css",
] as const;

export function getAboutStylesheets(): string[] {
  return ABOUT_STYLESHEETS.map(remapLegacyStylesheet);
}
