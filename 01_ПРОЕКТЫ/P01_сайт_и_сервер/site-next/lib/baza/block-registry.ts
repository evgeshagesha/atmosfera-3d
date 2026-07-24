import type { ComponentType } from "react";

import BazaDividerTextSection from "@/components/baza/blocks/BazaDividerTextSection";
import BazaQuoteSection from "@/components/baza/blocks/BazaQuoteSection";
import BazaSiteFooter from "@/components/baza/blocks/BazaSiteFooter";
import { BAZA_ANCHOR_BLOCKS } from "@/lib/baza/anchor-blocks";
import { BAZA_LINE_DIVIDER_BLOCKS } from "@/lib/baza/line-divider-blocks";
import { createLegacyBlockComponent } from "@/lib/site/create-legacy-block";
import { getPageBlock } from "@/lib/site/blocks";

const BazaSiteHeaderSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174432631"));
const BazaCoverSection = createLegacyBlockComponent(getPageBlock("baza", "rec2073587731"));
const BazaProgramHeroSection = createLegacyBlockComponent(getPageBlock("baza", "rec2181635121"));
const BazaMethodSliderSection = createLegacyBlockComponent(getPageBlock("baza", "rec2073587751"));
const BazaImageTextSection = createLegacyBlockComponent(getPageBlock("baza", "rec2173749861"));
const BazaReviewsSection = createLegacyBlockComponent(getPageBlock("baza", "rec2173947961"));
const BazaStepsSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174329671"));
const BazaBenefitsSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174405011"));
const BazaMethodSliderSection2 = createLegacyBlockComponent(getPageBlock("baza", "rec2174482941"));
const BazaAboutSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174626421"));
const BazaGallerySection = createLegacyBlockComponent(getPageBlock("baza", "rec2177899871"));
const BazaFaqSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174725431"));
const BazaModulesSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174872161"));
const BazaMethodSliderSection3 = createLegacyBlockComponent(getPageBlock("baza", "rec2174869421"));
const BazaPricingHeroSection = createLegacyBlockComponent(getPageBlock("baza", "rec2174794631"));
const BazaPaymentSection = createLegacyBlockComponent(getPageBlock("baza", "rec2175575511"));
const BazaFeatureSection1 = createLegacyBlockComponent(getPageBlock("baza", "rec2176725841"));
const BazaMethodSliderSection4 = createLegacyBlockComponent(getPageBlock("baza", "rec2176771471"));
const BazaTextSection = createLegacyBlockComponent(getPageBlock("baza", "rec2176940881"));
const BazaHtmlSection = createLegacyBlockComponent(getPageBlock("baza", "rec2177838451"));
const BazaFeatureSection2 = createLegacyBlockComponent(getPageBlock("baza", "rec2177881591"));
const BazaZeroSection1 = createLegacyBlockComponent(getPageBlock("baza", "rec2177947731"));
const BazaZeroSection2 = createLegacyBlockComponent(getPageBlock("baza", "rec2178049551"));
const BazaMethodSliderSection5 = createLegacyBlockComponent(getPageBlock("baza", "rec2178787101"));
const BazaContactsSection = createLegacyBlockComponent(getPageBlock("baza", "rec2178903091"));

export const BAZA_REACT_BLOCKS: Record<string, ComponentType> = {
  rec2174432631: BazaSiteHeaderSection,
  rec2073587731: BazaCoverSection,
  rec2073587741: BAZA_LINE_DIVIDER_BLOCKS.rec2073587741,
  rec2181635121: BazaProgramHeroSection,
  rec2181588291: BAZA_LINE_DIVIDER_BLOCKS.rec2181588291,
  rec2073587751: BazaMethodSliderSection,
  rec2173612661: BazaDividerTextSection,
  rec2073587761: BAZA_LINE_DIVIDER_BLOCKS.rec2073587761,
  rec2173749861: BazaImageTextSection,
  rec2174398701: BAZA_LINE_DIVIDER_BLOCKS.rec2174398701,
  rec2173947961: BazaReviewsSection,
  rec2174118901: BAZA_LINE_DIVIDER_BLOCKS.rec2174118901,
  rec2174108951: BazaQuoteSection,
  rec2174119881: BAZA_LINE_DIVIDER_BLOCKS.rec2174119881,
  rec2174329671: BazaStepsSection,
  rec2174405011: BazaBenefitsSection,
  rec2174487621: BAZA_LINE_DIVIDER_BLOCKS.rec2174487621,
  rec2174482941: BazaMethodSliderSection2,
  rec2174626421: BazaAboutSection,
  rec2181761871: BAZA_ANCHOR_BLOCKS.rec2181761871,
  rec2177899871: BazaGallerySection,
  rec2174725431: BazaFaqSection,
  rec2174872161: BazaModulesSection,
  rec2175216811: BAZA_LINE_DIVIDER_BLOCKS.rec2175216811,
  rec2174869421: BazaMethodSliderSection3,
  rec2178019161: BAZA_ANCHOR_BLOCKS.rec2178019161,
  rec2174794631: BazaPricingHeroSection,
  rec2175575511: BazaPaymentSection,
  rec2176725841: BazaFeatureSection1,
  rec2176771471: BazaMethodSliderSection4,
  rec2176940881: BazaTextSection,
  rec2177838451: BazaHtmlSection,
  rec2177883461: BAZA_LINE_DIVIDER_BLOCKS.rec2177883461,
  rec2177881591: BazaFeatureSection2,
  rec2177947731: BazaZeroSection1,
  rec2178049551: BazaZeroSection2,
  rec2178894311: BAZA_LINE_DIVIDER_BLOCKS.rec2178894311,
  rec2178787101: BazaMethodSliderSection5,
  rec2178903091: BazaContactsSection,
  rec2073587781: BAZA_LINE_DIVIDER_BLOCKS.rec2073587781,
  rec2073587801: BazaSiteFooter,
};
