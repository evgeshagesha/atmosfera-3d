#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/blocks/club/manifest.json"), "utf8")
);

const JSX_BLOCKS = {
  rec1147865031: "CLUB_ANCHOR_BLOCKS.rec1147865031",
  rec1147865746: "CLUB_ANCHOR_BLOCKS.rec1147865746",
  rec1147866741: "CLUB_ANCHOR_BLOCKS.rec1147866741",
  rec1147868156: "CLUB_ANCHOR_BLOCKS.rec1147868156",
  rec1147868781: "CLUB_ANCHOR_BLOCKS.rec1147868781",
  rec1148278101: "CLUB_ANCHOR_BLOCKS.rec1148278101",
  rec1147869746: "CLUB_ANCHOR_BLOCKS.rec1147869746",
  rec2280559881: "ClubVslSection",
  rec1147894846: "ClubScrollbarStyles",
  rec1147894321: "ClubEmptyBlock",
};

const SEMANTIC_NAMES = {
  rec1144359426: "ClubHeroSection",
  rec1147852396: "ClubMobileMenuSection",
  rec1140990496: "ClubIntroSection",
  rec1142713381: "ClubAboutSection",
  rec1147877316: "ClubVideoPopupSection",
  rec1144222061: "ClubFeatureSection1",
  rec1144367136: "ClubBenefitsSection",
  rec1144351581: "ClubFeatureSection2",
  rec1144222031: "ClubForWhomSection",
  rec1145582781: "ClubScrollScriptSection1",
  rec1145552311: "ClubProgramSection",
  rec1145589341: "ClubFeatureSection3",
  rec1145595476: "ClubModulesSection",
  rec1145781956: "ClubFeatureSection4",
  rec1145742951: "ClubTariffsSection",
  rec1145727246: "ClubFeatureSection5",
  rec1145782611: "ClubResultsSection",
  rec1145817936: "ClubFeatureSection6",
  rec1145818246: "ClubReviewsSection",
  rec1147911501: "ClubEmptyScriptSection",
  rec1145829776: "ClubFeatureSection7",
  rec1146281676: "ClubTrainerSection",
  rec1146281931: "ClubFeatureSection8",
  rec1146332496: "ClubCommunitySection",
  rec1146332321: "ClubFeatureSection9",
  rec1146425806: "ClubPricingSection",
  rec1146566096: "ClubGridScriptSection",
  rec1146561446: "ClubFeatureSection10",
  rec1146573076: "ClubFaqSection",
  rec1146578701: "ClubFeatureSection11",
  rec1146579081: "ClubContactsSection",
  rec1145585201: "ClubCtaSection",
  rec1147900651: "ClubScriptSection2",
  rec1148453191: "ClubScriptSection3",
};

const constLines = [];
const registryLines = [];

for (const block of manifest) {
  const jsx = JSX_BLOCKS[block.id];
  if (jsx) {
    registryLines.push(`  ${block.id}: ${jsx},`);
    continue;
  }

  const name = SEMANTIC_NAMES[block.id] ?? `ClubBlock${block.id.replace("rec", "")}`;
  constLines.push(
    `const ${name} = createExactBlockComponent(getPageBlock("club", "${block.id}"));`
  );
  registryLines.push(`  ${block.id}: ${name},`);
}

const output = `import type { ComponentType } from "react";

import ClubEmptyBlock from "@/components/club/blocks/ClubEmptyBlock";
import ClubScrollbarStyles from "@/components/club/blocks/ClubScrollbarStyles";
import ClubVslSection from "@/components/club/blocks/ClubVslSection";
import { CLUB_ANCHOR_BLOCKS } from "@/lib/club/anchor-blocks";
import { createExactBlockComponent } from "@/lib/pages/create-exact-block";
import { getPageBlock } from "@/lib/tilda/blocks";

${constLines.join("\n")}

export const CLUB_REACT_BLOCKS: Record<string, ComponentType> = {
${registryLines.join("\n")}
};
`;

fs.writeFileSync(path.join(__dirname, "block-registry.ts"), output);
console.log(`Generated club block registry with ${manifest.length} blocks`);
