import ArtboardRuntime from "@/components/site/ArtboardRuntime";
import LegacyInteractivity from "@/components/site/LegacyInteractivity";
import PageStyles from "@/components/site/PageStyles";
import TAnimateRuntime from "@/components/site/TAnimateRuntime";
import { getPageAllrecordsAttrs } from "@/lib/pages/allrecords";
import { getPageData } from "@/lib/pages";
import { getArtboardInitScripts } from "@/lib/site/artboard-scripts";
import { getPageBlock } from "@/lib/site/blocks";
import { getPageStylesheets } from "@/lib/site/page-styles";
import { injectTreeContent } from "@/lib/tree/tree-markup";
import { TREE_ROUTE } from "@/lib/tree/config";
import TreeLayoutRuntime from "@/components/tree/TreeLayoutRuntime";

const TREE_BLOCK_ID = "rec2252402801";

export default function TreePage() {
  const page = getPageData(TREE_ROUTE);
  const block = getPageBlock(TREE_ROUTE, TREE_BLOCK_ID);
  const html = injectTreeContent(block.html);
  const attrs = getPageAllrecordsAttrs(page.body);
  const stylesheets = getPageStylesheets(TREE_ROUTE);
  const artboardScripts = getArtboardInitScripts(TREE_ROUTE);

  return (
    <main>
      <PageStyles stylesheets={stylesheets} />
      <div id="allrecords" className={attrs.className || "t-records"}>
        <div
          data-site-block={TREE_BLOCK_ID}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {artboardScripts.length > 0 ? <ArtboardRuntime initScripts={artboardScripts} /> : null}
      <TreeLayoutRuntime />
      <LegacyInteractivity route={TREE_ROUTE} />
      <TAnimateRuntime />
    </main>
  );
}
