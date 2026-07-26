import type { ComponentType } from "react";

import ClubEmptyBlock from "@/components/club/blocks/ClubEmptyBlock";
import ClubCreatorSection from "@/components/club/blocks/ClubCreatorSection";
import ClubForYouSection from "@/components/club/blocks/ClubForYouSection";
import ClubHelpSection from "@/components/club/blocks/ClubHelpSection";
import ClubHeroSection from "@/components/club/blocks/ClubHeroSection";
import ClubScrollbarStyles from "@/components/club/blocks/ClubScrollbarStyles";
import ClubSystemSection from "@/components/club/blocks/ClubSystemSection";
import { CLUB_ANCHOR_BLOCKS } from "@/lib/club/anchor-blocks";
import { createLegacyBlockComponent } from "@/lib/site/create-legacy-block";
import { getPageBlock } from "@/lib/site/blocks";

/**
 * Club blocks from Tilda export — HTML is read from data/blocks/club/*.json
 * so the page stays editable block-by-block like the main site.
 * First viewport (header+hero) is a React block matching EG brand colors.
 */
function ClubHiddenBlock() {
  return null;
}

const ClubScrollScriptSection1 = createLegacyBlockComponent(getPageBlock("club", "rec1145582781"));
const ClubFeatureSection4 = createLegacyBlockComponent(getPageBlock("club", "rec1145781956"));
const ClubTariffsSection = createLegacyBlockComponent(getPageBlock("club", "rec1145742951"));
const ClubFeatureSection5 = createLegacyBlockComponent(getPageBlock("club", "rec1145727246"));
const ClubResultsSection = createLegacyBlockComponent(getPageBlock("club", "rec1145782611"));
const ClubFeatureSection6 = createLegacyBlockComponent(getPageBlock("club", "rec1145817936"));
const ClubReviewsSection = createLegacyBlockComponent(getPageBlock("club", "rec1145818246"));
const ClubEmptyScriptSection = createLegacyBlockComponent(getPageBlock("club", "rec1147911501"));
const ClubFeatureSection7 = createLegacyBlockComponent(getPageBlock("club", "rec1145829776"));
const ClubTrainerSection = createLegacyBlockComponent(getPageBlock("club", "rec1146281676"));
const ClubFeatureSection8 = createLegacyBlockComponent(getPageBlock("club", "rec1146281931"));
const ClubCommunitySection = createLegacyBlockComponent(getPageBlock("club", "rec1146332496"));
const ClubFeatureSection9 = createLegacyBlockComponent(getPageBlock("club", "rec1146332321"));
const ClubPricingSection = createLegacyBlockComponent(getPageBlock("club", "rec1146425806"));
const ClubGridScriptSection = createLegacyBlockComponent(getPageBlock("club", "rec1146566096"));
const ClubFeatureSection10 = createLegacyBlockComponent(getPageBlock("club", "rec1146561446"));
const ClubFaqSection = createLegacyBlockComponent(getPageBlock("club", "rec1146573076"));
const ClubFeatureSection11 = createLegacyBlockComponent(getPageBlock("club", "rec1146578701"));
const ClubContactsSection = createLegacyBlockComponent(getPageBlock("club", "rec1146579081"));
const ClubCtaSection = createLegacyBlockComponent(getPageBlock("club", "rec1145585201"));
const ClubScriptSection2 = createLegacyBlockComponent(getPageBlock("club", "rec1147900651"));
const ClubScriptSection3 = createLegacyBlockComponent(getPageBlock("club", "rec1148453191"));

export const CLUB_REACT_BLOCKS: Record<string, ComponentType> = {
  rec1144359426: ClubHeroSection,
  // Replaced by ClubHeroSection (sticky nav + mobile menu)
  rec1147852396: ClubHiddenBlock,
  // Old Tilda intro — content moved into ClubHeroSection
  rec1140990496: ClubHiddenBlock,
  rec1147865031: CLUB_ANCHOR_BLOCKS.rec1147865031,
  rec1142713381: ClubSystemSection,
  rec1147877316: ClubHiddenBlock,
  rec1144222061: ClubHiddenBlock,
  rec1144367136: ClubCreatorSection,
  rec1144351581: ClubHiddenBlock,
  rec1147865746: CLUB_ANCHOR_BLOCKS.rec1147865746,
  rec1144222031: ClubForYouSection,
  // Old Tilda for-whom cards — replaced by ClubForYouSection
  rec1145552311: ClubHiddenBlock,
  rec1145582781: ClubScrollScriptSection1,
  // Empty legacy spacer — replaced by ClubHelpSection
  rec1145589341: ClubHiddenBlock,
  rec1145595476: ClubHelpSection,
  rec1145781956: ClubFeatureSection4,
  rec1145742951: ClubTariffsSection,
  rec1145727246: ClubFeatureSection5,
  rec1147866741: CLUB_ANCHOR_BLOCKS.rec1147866741,
  rec1145782611: ClubResultsSection,
  rec1145817936: ClubFeatureSection6,
  rec1147868156: CLUB_ANCHOR_BLOCKS.rec1147868156,
  rec1145818246: ClubReviewsSection,
  rec1147911501: ClubEmptyScriptSection,
  rec1145829776: ClubFeatureSection7,
  rec1146281676: ClubTrainerSection,
  rec1146281931: ClubFeatureSection8,
  rec1147868781: CLUB_ANCHOR_BLOCKS.rec1147868781,
  rec1146332496: ClubCommunitySection,
  rec1146332321: ClubFeatureSection9,
  rec1148278101: CLUB_ANCHOR_BLOCKS.rec1148278101,
  rec1146425806: ClubPricingSection,
  rec1146566096: ClubGridScriptSection,
  rec1146561446: ClubFeatureSection10,
  rec1146573076: ClubFaqSection,
  rec1146578701: ClubFeatureSection11,
  rec1147869746: CLUB_ANCHOR_BLOCKS.rec1147869746,
  rec1146579081: ClubContactsSection,
  rec1145585201: ClubCtaSection,
  rec1147900651: ClubScriptSection2,
  rec1148453191: ClubScriptSection3,
  rec1147894846: ClubScrollbarStyles,
  rec1147894321: ClubEmptyBlock,
};
