import { remapLegacyStylesheet } from "@/lib/site/page-styles";

/** Minimal legacy CSS set for the homepage — drops unused Tilda bundles. */
const HOME_STYLESHEETS = [
  "/tilda/css/tilda-grid-3.0.min.css",
  "/tilda/css/tilda-blocks-page126786736.min.css",
  "/tilda/css/tilda-animation-2.0.min.css",
  "/tilda/css/tilda-menu-burger-1.0.min.css",
  "/tilda/css/tilda-cards-1.0.min.css",
  "/tilda/css/tilda-slds-1.4.min.css",
  "/tilda/css/tilda-popup-1.1.min.css",
  "/tilda/css/tilda-feed-1.1.min.css",
  "/tilda/css/tilda-forms-1.0.min.css",
  "/tilda/css/tilda-cover-1.0.min.css",
  "/tilda/css/tilda-contact-method-1.0.min.css",
] as const;

export function getHomeStylesheets(): string[] {
  return HOME_STYLESHEETS.map(remapLegacyStylesheet);
}
