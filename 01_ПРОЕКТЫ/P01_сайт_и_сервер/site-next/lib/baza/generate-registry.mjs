#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/blocks/baza/manifest.json"), "utf8")
);

const JSX_BLOCKS = {
  rec2174432631: "BazaSiteHeaderSection",
  rec2073587741: "BAZA_LINE_DIVIDER_BLOCKS.rec2073587741",
  rec2181588291: "BAZA_LINE_DIVIDER_BLOCKS.rec2181588291",
  rec2073587761: "BAZA_LINE_DIVIDER_BLOCKS.rec2073587761",
  rec2173612661: "BazaDividerTextSection",
  rec2173749861: "BazaImageTextSection",
  rec2174398701: "BAZA_LINE_DIVIDER_BLOCKS.rec2174398701",
  rec2174118901: "BAZA_LINE_DIVIDER_BLOCKS.rec2174118901",
  rec2174108951: "BazaQuoteSection",
  rec2174119881: "BAZA_LINE_DIVIDER_BLOCKS.rec2174119881",
  rec2174487621: "BAZA_LINE_DIVIDER_BLOCKS.rec2174487621",
  rec2181761871: "BAZA_ANCHOR_BLOCKS.rec2181761871",
  rec2175216811: "BAZA_LINE_DIVIDER_BLOCKS.rec2175216811",
  rec2178019161: "BAZA_ANCHOR_BLOCKS.rec2178019161",
  rec2177883461: "BAZA_LINE_DIVIDER_BLOCKS.rec2177883461",
  rec2178894311: "BAZA_LINE_DIVIDER_BLOCKS.rec2178894311",
  rec2073587781: "BAZA_LINE_DIVIDER_BLOCKS.rec2073587781",
  rec2073587801: "BazaSiteFooter",
};

const SEMANTIC_NAMES = {
  rec2073587731: "BazaCoverSection",
  rec2181635121: "BazaProgramHeroSection",
  rec2073587751: "BazaMethodSliderSection",
  rec2173947961: "BazaReviewsSection",
  rec2174329671: "BazaStepsSection",
  rec2174405011: "BazaBenefitsSection",
  rec2174482941: "BazaMethodSliderSection2",
  rec2174626421: "BazaAboutSection",
  rec2177899871: "BazaGallerySection",
  rec2174725431: "BazaFaqSection",
  rec2174872161: "BazaModulesSection",
  rec2174869421: "BazaMethodSliderSection3",
  rec2174794631: "BazaPricingHeroSection",
  rec2175575511: "BazaPaymentSection",
  rec2176725841: "BazaFeatureSection1",
  rec2176771471: "BazaMethodSliderSection4",
  rec2176940881: "BazaTextSection",
  rec2177838451: "BazaHtmlSection",
  rec2177881591: "BazaFeatureSection2",
  rec2177947731: "BazaZeroSection1",
  rec2178049551: "BazaZeroSection2",
  rec2178787101: "BazaMethodSliderSection5",
  rec2178903091: "BazaContactsSection",
};

const constLines = [];
const registryLines = [];

for (const block of manifest) {
  const jsx = JSX_BLOCKS[block.id];
  if (jsx) {
    if (!jsx.includes(".") && !jsx.startsWith("Baza")) {
      // exact component reference that's a const name
    }
    if (
      jsx.startsWith("Baza") &&
      !jsx.includes("BLOCKS") &&
      jsx !== "BazaDividerTextSection" &&
      jsx !== "BazaQuoteSection" &&
      jsx !== "BazaSiteFooter"
    ) {
      constLines.push(
        `const ${jsx} = createExactBlockComponent(getPageBlock("baza", "${block.id}"));`
      );
    }
    registryLines.push(`  ${block.id}: ${jsx},`);
    continue;
  }

  const name = SEMANTIC_NAMES[block.id] ?? `BazaBlock${block.id.replace("rec", "")}`;
  constLines.push(
    `const ${name} = createExactBlockComponent(getPageBlock("baza", "${block.id}"));`
  );
  registryLines.push(`  ${block.id}: ${name},`);
}

const output = `import type { ComponentType } from "react";

import BazaDividerTextSection from "@/components/baza/blocks/BazaDividerTextSection";
import BazaQuoteSection from "@/components/baza/blocks/BazaQuoteSection";
import BazaSiteFooter from "@/components/baza/blocks/BazaSiteFooter";
import { BAZA_ANCHOR_BLOCKS } from "@/lib/baza/anchor-blocks";
import { BAZA_LINE_DIVIDER_BLOCKS } from "@/lib/baza/line-divider-blocks";
import { createExactBlockComponent } from "@/lib/pages/create-exact-block";
import { getPageBlock } from "@/lib/tilda/blocks";

${constLines.join("\n")}

export const BAZA_REACT_BLOCKS: Record<string, ComponentType> = {
${registryLines.join("\n")}
};
`;

fs.writeFileSync(path.join(__dirname, "block-registry.ts"), output);
console.log(`Generated baza block registry with ${manifest.length} blocks`);
