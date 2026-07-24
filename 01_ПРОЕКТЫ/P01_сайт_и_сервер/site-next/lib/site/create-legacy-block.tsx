import type { SiteBlockData } from "@/lib/site/blocks";

export function createLegacyBlockComponent(block: SiteBlockData) {
  function LegacyBlock() {
    return (
      <div
        data-site-block={block.id}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }

  LegacyBlock.displayName = block.id;
  return LegacyBlock;
}
