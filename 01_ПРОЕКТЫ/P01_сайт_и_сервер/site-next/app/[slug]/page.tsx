import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/about/AboutPage";
import TreePage from "@/components/tree/TreePage";
import SitePage from "@/components/site/SitePage";
import JsonLd from "@/components/seo/JsonLd";
import { getAllRoutes, getPageData } from "@/lib/pages";
import { ABOUT_ROUTE } from "@/lib/about";
import { TREE_ROUTE } from "@/lib/tree/config";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllRoutes().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPageData(slug);
    return buildPageMetadata(slug, meta);
  } catch {
    return {};
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (!getAllRoutes().includes(slug)) {
    notFound();
  }

  const page = getPageData(slug);

  return (
    <>
      <JsonLd items={page.jsonLd ?? []} />
      {slug === ABOUT_ROUTE ? (
        <AboutPage />
      ) : slug === TREE_ROUTE ? (
        <TreePage />
      ) : (
        <SitePage route={slug} />
      )}
    </>
  );
}
