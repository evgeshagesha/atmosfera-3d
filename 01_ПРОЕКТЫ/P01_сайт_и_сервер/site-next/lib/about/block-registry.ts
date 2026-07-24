import type { ComponentType } from "react";

import AboutApproachSection from "@/components/about/blocks/AboutApproachSection";
import AboutBeliefsSection from "@/components/about/blocks/AboutBeliefsSection";
import AboutContactsSection from "@/components/about/blocks/AboutContactsSection";
import AboutCoverSection from "@/components/about/blocks/AboutCoverSection";
import AboutExperienceSection from "@/components/about/blocks/AboutExperienceSection";
import AboutGermanyTextSection from "@/components/about/blocks/AboutGermanyTextSection";
import AboutHistorySection from "@/components/about/blocks/AboutHistorySection";
import AboutInjurySection from "@/components/about/blocks/AboutInjurySection";
import AboutIntroSection from "@/components/about/blocks/AboutIntroSection";
import AboutPathSection from "@/components/about/blocks/AboutPathSection";
import AboutPracticeSection from "@/components/about/blocks/AboutPracticeSection";
import AboutPrefaceSection from "@/components/about/blocks/AboutPrefaceSection";
import AboutSiteFooter from "@/components/about/blocks/AboutSiteFooter";
import AboutSiteHeader from "@/components/about/blocks/AboutSiteHeader";
import AboutStorySection from "@/components/about/blocks/AboutStorySection";
import AboutTimelineSection from "@/components/about/blocks/AboutTimelineSection";
import AboutTrustSection from "@/components/about/blocks/AboutTrustSection";
import { ABOUT_LINE_DIVIDER_BLOCKS } from "@/lib/about/line-divider-blocks";

export const ABOUT_REACT_BLOCKS: Record<string, ComponentType> = {
  rec2039710001: AboutSiteHeader,
  rec2039710041: AboutCoverSection,
  rec2040452621: ABOUT_LINE_DIVIDER_BLOCKS.rec2040452621,
  rec2039710061: AboutIntroSection,
  rec2040463581: ABOUT_LINE_DIVIDER_BLOCKS.rec2040463581,
  rec2040496461: AboutHistorySection,
  rec2040528391: ABOUT_LINE_DIVIDER_BLOCKS.rec2040528391,
  rec2042403101: AboutPathSection,
  rec2042622411: ABOUT_LINE_DIVIDER_BLOCKS.rec2042622411,
  rec2040523631: AboutStorySection,
  rec2046686381: AboutGermanyTextSection,
  rec2040552631: ABOUT_LINE_DIVIDER_BLOCKS.rec2040552631,
  rec2040541381: AboutTimelineSection,
  rec2046766271: AboutPrefaceSection,
  rec2046841831: AboutBeliefsSection,
  rec2046985631: AboutInjurySection,
  rec2040558301: ABOUT_LINE_DIVIDER_BLOCKS.rec2040558301,
  rec2048796451: AboutExperienceSection,
  rec2049012061: ABOUT_LINE_DIVIDER_BLOCKS.rec2049012061,
  rec2049011671: AboutPracticeSection,
  rec2050148451: ABOUT_LINE_DIVIDER_BLOCKS.rec2050148451,
  rec2049333161: AboutTrustSection,
  rec2050150741: ABOUT_LINE_DIVIDER_BLOCKS.rec2050150741,
  rec2039710141: AboutApproachSection,
  rec2050191101: ABOUT_LINE_DIVIDER_BLOCKS.rec2050191101,
  rec2039710181: AboutContactsSection,
  rec2051657661: ABOUT_LINE_DIVIDER_BLOCKS.rec2051657661,
  rec2039710211: AboutSiteFooter,
};
