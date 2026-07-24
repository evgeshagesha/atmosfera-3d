/** Route slug for the about page (`/about`). */
export const ABOUT_ROUTE = "about" as const;

export const ABOUT_PAGE_STATUS = {
  ready: true,
  version: "1.0.0",
  label: "production-ready",
  blocksTotal: 28,
  blocksNamed: 17,
  blocksDividers: 11,
  updatedAt: "2026-07-09",
} as const;

export const ABOUT_NAMED_BLOCKS = [
  { id: "rec2039710001", name: "AboutSiteHeader", path: "components/about/blocks/AboutSiteHeader" },
  { id: "rec2039710041", name: "AboutCoverSection", path: "components/about/blocks/AboutCoverSection" },
  { id: "rec2039710061", name: "AboutIntroSection", path: "components/about/blocks/AboutIntroSection" },
  { id: "rec2040496461", name: "AboutHistorySection", path: "components/about/blocks/AboutHistorySection" },
  { id: "rec2042403101", name: "AboutPathSection", path: "components/about/blocks/AboutPathSection" },
  { id: "rec2040523631", name: "AboutStorySection", path: "components/about/blocks/AboutStorySection" },
  { id: "rec2046686381", name: "AboutGermanyTextSection", path: "components/about/blocks/AboutGermanyTextSection" },
  { id: "rec2040541381", name: "AboutTimelineSection", path: "components/about/blocks/AboutTimelineSection" },
  { id: "rec2046766271", name: "AboutPrefaceSection", path: "components/about/blocks/AboutPrefaceSection" },
  { id: "rec2046841831", name: "AboutBeliefsSection", path: "components/about/blocks/AboutBeliefsSection" },
  { id: "rec2046985631", name: "AboutInjurySection", path: "components/about/blocks/AboutInjurySection" },
  { id: "rec2048796451", name: "AboutExperienceSection", path: "components/about/blocks/AboutExperienceSection" },
  { id: "rec2049011671", name: "AboutPracticeSection", path: "components/about/blocks/AboutPracticeSection" },
  { id: "rec2049333161", name: "AboutTrustSection", path: "components/about/blocks/AboutTrustSection" },
  { id: "rec2039710141", name: "AboutApproachSection", path: "components/about/blocks/AboutApproachSection" },
  { id: "rec2039710181", name: "AboutContactsSection", path: "components/about/blocks/AboutContactsSection" },
  { id: "rec2039710211", name: "AboutSiteFooter", path: "components/about/blocks/AboutSiteFooter" },
] as const;

export const ABOUT_RUNTIME = {
  artboardScripts: true,
  legacyInteractivity: true,
  tAnimate: true,
  stylesheets: "lib/about/stylesheets.ts",
} as const;
