import AboutCtaSection from "@/components/home/blocks/AboutCtaSection";
import AboutSection from "@/components/home/blocks/AboutSection";
import AudienceIntroSection from "@/components/home/blocks/AudienceIntroSection";
import HeroSection from "@/components/home/blocks/HeroSection";
import MarqueeSection from "@/components/home/blocks/MarqueeSection";
import MoreReviewsButtonSection from "@/components/home/blocks/MoreReviewsButtonSection";
import SiteFooter from "@/components/home/blocks/SiteFooter";
import SiteHeader from "@/components/home/blocks/SiteHeader";
import YandexRatingSection from "@/components/home/blocks/YandexRatingSection";
import BlogSection from "@/components/home/blocks/BlogSection";
import ContactFormSection from "@/components/home/blocks/ContactFormSection";
import FormatsSection from "@/components/home/blocks/FormatsSection";
import GallerySection from "@/components/home/blocks/GallerySection";
import { LINE_DIVIDER_BLOCKS } from "@/lib/home/line-divider-blocks";

import type { ComponentType } from "react";

export const HOME_REACT_BLOCKS: Record<string, ComponentType> = {
  rec2034125441: SiteHeader,
  rec2315596141: HeroSection,
  rec2034125511: FormatsSection,
  rec2315696391: LINE_DIVIDER_BLOCKS.rec2315696391,
  rec2224175751: GallerySection,
  rec2097875471: MoreReviewsButtonSection,
  rec2191985091: YandexRatingSection,
  rec2040539251: AudienceIntroSection,
  rec2039098741: LINE_DIVIDER_BLOCKS.rec2039098741,
  rec2169195921: BlogSection,
  rec2192006421: LINE_DIVIDER_BLOCKS.rec2192006421,
  rec2034125521: AboutSection,
  rec2039338091: LINE_DIVIDER_BLOCKS.rec2039338091,
  rec2038979781: AboutCtaSection,
  rec2039587311: LINE_DIVIDER_BLOCKS.rec2039587311,
  rec2191858991: MarqueeSection,
  rec2195114021: LINE_DIVIDER_BLOCKS.rec2195114021,
  rec2191126061: ContactFormSection,
  rec2039329591: SiteFooter,
};

export function hasReactBlock(id: string) {
  return id in HOME_REACT_BLOCKS;
}

export function getReactBlock(id: string) {
  return HOME_REACT_BLOCKS[id];
}
