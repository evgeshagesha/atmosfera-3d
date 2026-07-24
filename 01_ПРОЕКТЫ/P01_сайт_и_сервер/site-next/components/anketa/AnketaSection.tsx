import AnketaFormClient from "@/components/anketa/AnketaFormClient";
import { getPageBlock } from "@/lib/site/blocks";

const block = getPageBlock("anketa", "rec2225783961");

export default function AnketaSection() {
  return (
    <>
      <div
        data-site-block={block.id}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
      <AnketaFormClient />
    </>
  );
}
