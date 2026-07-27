import type { ComponentType } from "react";

import ClubEmptyBlock from "@/components/club/blocks/ClubEmptyBlock";
import ClubCommunitySetupSection from "@/components/club/blocks/ClubCommunitySetupSection";
import ClubCreatorSection from "@/components/club/blocks/ClubCreatorSection";
import ClubForYouSection from "@/components/club/blocks/ClubForYouSection";
import ClubHelpSection from "@/components/club/blocks/ClubHelpSection";
import ClubHeroSection from "@/components/club/blocks/ClubHeroSection";
import ClubMembershipValueSection from "@/components/club/blocks/ClubMembershipValueSection";
import ClubSystemSection from "@/components/club/blocks/ClubSystemSection";
import ClubTariffsSection from "@/components/club/blocks/ClubTariffsSection";
import ClubGuaranteeSupportSection from "@/components/club/blocks/ClubGuaranteeSupportSection";
import ClubChangesSection from "@/components/club/blocks/ClubChangesSection";
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
const ClubEmptyScriptSection = createLegacyBlockComponent(getPageBlock("club", "rec1147911501"));
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
  // Empty legacy spacer
  rec1145781956: ClubHiddenBlock,
  rec1145742951: ClubCommunitySetupSection,
  // Empty legacy spacer
  rec1145727246: ClubHiddenBlock,
  rec1147866741: CLUB_ANCHOR_BLOCKS.rec1147866741,
  rec1145782611: ClubMembershipValueSection,
  // Old Tilda gray spacer after membership — hide
  rec1145817936: ClubHiddenBlock,
  rec1147868156: CLUB_ANCHOR_BLOCKS.rec1147868156,
  // Old Tilda tariff cards — replaced by ClubTariffsSection
  rec1145818246: ClubTariffsSection,
  rec1147911501: ClubEmptyScriptSection,
  // Old gray spacer before guarantee — hide
  rec1145829776: ClubHiddenBlock,
  // Old Tilda money-back / support — replaced by React block
  rec1146281676: ClubGuaranteeSupportSection,
  // Old gray spacer before changes — hide
  rec1146281931: ClubHiddenBlock,
  rec1147868781: CLUB_ANCHOR_BLOCKS.rec1147868781,
  // Old Tilda "Изменения" — replaced by ClubChangesSection
  rec1146332496: ClubChangesSection,
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
  rec1147894846: ClubHiddenBlock,
  rec1147894321: ClubEmptyBlock,
};
