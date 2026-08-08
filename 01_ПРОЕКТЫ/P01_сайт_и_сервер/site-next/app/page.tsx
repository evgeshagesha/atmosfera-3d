import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { HOME_ROUTE } from "@/lib/home";
import { getPageData } from "@/lib/pages";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

/** Blog strip on home respects publishedAt schedule. */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = getPageData(HOME_ROUTE);
  return buildPageMetadata(HOME_ROUTE, meta);
}

export default function Page() {
  const page = getPageData(HOME_ROUTE);

  return (
    <>
      <JsonLd items={page.jsonLd ?? []} />
      <HomePage />
    </>
  );
}
