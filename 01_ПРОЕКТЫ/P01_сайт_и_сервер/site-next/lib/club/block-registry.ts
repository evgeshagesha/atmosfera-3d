import type { ComponentType } from "react";

import ClubEmptyBlock from "@/components/club/blocks/ClubEmptyBlock";
import ClubScrollbarStyles from "@/components/club/blocks/ClubScrollbarStyles";
import ClubVslSection from "@/components/club/blocks/ClubVslSection";
import { CLUB_ANCHOR_BLOCKS } from "@/lib/club/anchor-blocks";
import { createLegacyBlockComponent } from "@/lib/site/create-legacy-block";
import { getPageBlock } from "@/lib/site/blocks";

const ClubHeroSection = createLegacyBlockComponent(getPageBlock("club", "rec1144359426"));
const ClubMobileMenuSection = createLegacyBlockComponent(getPageBlock("club", "rec1147852396"));
const ClubIntroSection = createLegacyBlockComponent(getPageBlock("club", "rec1140990496"));
const ClubAboutSection = createLegacyBlockComponent(getPageBlock("club", "rec1142713381"));
const ClubVideoPopupSection = createLegacyBlockComponent(getPageBlock("club", "rec1147877316"));
const ClubFeatureSection1 = createLegacyBlockComponent(getPageBlock("club", "rec1144222061"));
const ClubBenefitsSection = createLegacyBlockComponent(getPageBlock("club", "rec1144367136"));
const ClubFeatureSection2 = createLegacyBlockComponent(getPageBlock("club", "rec1144351581"));
const ClubForWhomSection = createLegacyBlockComponent(getPageBlock("club", "rec1144222031"));
const ClubScrollScriptSection1 = createLegacyBlockComponent(getPageBlock("club", "rec1145582781"));
const ClubProgramSection = createLegacyBlockComponent(getPageBlock("club", "rec1145552311"));
const ClubFeatureSection3 = createLegacyBlockComponent(getPageBlock("club", "rec1145589341"));
const ClubModulesSection = createLegacyBlockComponent(getPageBlock("club", "rec1145595476"));
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
  rec1147852396: ClubMobileMenuSection,
  rec1140990496: ClubIntroSection,
  rec2280559881: ClubVslSection,
  rec1147865031: CLUB_ANCHOR_BLOCKS.rec1147865031,
  rec1142713381: ClubAboutSection,
  rec1147877316: ClubVideoPopupSection,
  rec1144222061: ClubFeatureSection1,
  rec1144367136: ClubBenefitsSection,
  rec1144351581: ClubFeatureSection2,
  rec1147865746: CLUB_ANCHOR_BLOCKS.rec1147865746,
  rec1144222031: ClubForWhomSection,
  rec1145582781: ClubScrollScriptSection1,
  rec1145552311: ClubProgramSection,
  rec1145589341: ClubFeatureSection3,
  rec1145595476: ClubModulesSection,
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
