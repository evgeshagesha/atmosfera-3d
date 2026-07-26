import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import SitePage from "@/components/site/SitePage";
import { getPageData } from "@/lib/pages";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

import "@/components/club/club-page-shell.css";

const ROUTE = "club";

export function generateMetadata(): Metadata {
  const { meta } = getPageData(ROUTE);
  return buildPageMetadata(ROUTE, meta);
}

/** Club page: Tilda blocks + EG-colored first hero. */
export default function ClubPage() {
  const page = getPageData(ROUTE);

  return (
    <div className="club-page-shell">
      <JsonLd items={page.jsonLd ?? []} />
      <SitePage route={ROUTE} />
    </div>
  );
}
