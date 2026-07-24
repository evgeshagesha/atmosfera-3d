import ArtboardRuntime from "@/components/site/ArtboardRuntime";
import LegacyInteractivity from "@/components/site/LegacyInteractivity";
import PageStyles from "@/components/site/PageStyles";
import TAnimateRuntime from "@/components/site/TAnimateRuntime";
import { getPageAllrecordsAttrs } from "@/lib/pages/allrecords";
import { getPageReactBlock } from "@/lib/pages/block-registry";
import { getPageData } from "@/lib/pages";
import { getAllPageBlocks } from "@/lib/site/blocks";
import { getArtboardInitScripts } from "@/lib/site/artboard-scripts";
import { getPageStylesheets } from "@/lib/site/page-styles";

type SitePageProps = {
  route: string;
  stylesheets?: string[];
};

export default function SitePage({ route, stylesheets }: SitePageProps) {
  const page = getPageData(route);
  const blocks = getAllPageBlocks(route);
  const resolvedStylesheets = stylesheets ?? getPageStylesheets(route);
  const artboardScripts = getArtboardInitScripts(route);
  const attrs = getPageAllrecordsAttrs(page.body);

  return (
    <main>
      <PageStyles stylesheets={resolvedStylesheets} />
      <div id="allrecords" className={attrs.className || "t-records"}>
        {blocks.map((block) => {
          const ReactBlock = getPageReactBlock(route, block.id);
          return <ReactBlock key={block.id} />;
        })}
      </div>
      {artboardScripts.length > 0 ? (
        <ArtboardRuntime initScripts={artboardScripts} />
      ) : null}
      <LegacyInteractivity route={route} />
      <TAnimateRuntime />
    </main>
  );
}
