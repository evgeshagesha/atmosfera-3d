import TildaScripts from "@/components/tilda/TildaScripts";
import { getPageAllrecordsAttrs } from "@/lib/pages/allrecords";
import { getPageReactBlock } from "@/lib/pages/block-registry";
import { getPageData } from "@/lib/pages";
import { getAllPageBlocks } from "@/lib/tilda/blocks";
import { getPageInlineScripts } from "@/lib/tilda/page-scripts";

const CRITICAL_SCRIPTS = new Set([
  "/tilda/js/jquery-1.10.2.min.js",
  "/tilda/js/tilda-scripts-3.0.min.js",
]);

type TildaRoutePageProps = {
  route: string;
};

export default function TildaRoutePage({ route }: TildaRoutePageProps) {
  const page = getPageData(route);
  const blocks = getAllPageBlocks(route);
  const inlineScripts = getPageInlineScripts(route);
  const deferredJs = (page.js ?? []).filter((src) => !CRITICAL_SCRIPTS.has(src));
  const attrs = getPageAllrecordsAttrs(page.body);

  return (
    <main>
      <div
        id="allrecords"
        className={attrs.className}
        data-hook={attrs.dataHook}
        data-tilda-project-id={attrs.dataTildaProjectId}
        data-tilda-page-id={attrs.dataTildaPageId}
        data-tilda-formskey={attrs.dataTildaFormskey}
        data-tilda-cookie={attrs.dataTildaCookie}
        data-tilda-lazy={attrs.dataTildaLazy}
        data-tilda-project-lang={attrs.dataTildaProjectLang}
        data-tilda-root-zone={attrs.dataTildaRootZone}
        data-tilda-project-country={attrs.dataTildaProjectCountry}
        {...(attrs.dataTildaPageAlias
          ? { "data-tilda-page-alias": attrs.dataTildaPageAlias }
          : {})}
      >
        {blocks.map((block) => {
          const ReactBlock = getPageReactBlock(route, block.id);
          return <ReactBlock key={block.id} />;
        })}
      </div>
      <TildaScripts css={page.css ?? []} js={deferredJs} inlineScripts={inlineScripts} />
    </main>
  );
}
