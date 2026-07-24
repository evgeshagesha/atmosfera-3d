import type { ComponentType } from "react";

import { ABOUT_REACT_BLOCKS } from "@/lib/about/block-registry";
import { ANKETA_REACT_BLOCKS } from "@/lib/anketa/block-registry";
import { BAZA_REACT_BLOCKS } from "@/lib/baza/block-registry";
import { CLUB_REACT_BLOCKS } from "@/lib/club/block-registry";
import { HOME_REACT_BLOCKS } from "@/lib/home/block-registry";
import { HOME_ROUTE } from "@/lib/home/config";
import { createLegacyBlockComponent } from "@/lib/site/create-legacy-block";
import { getPageBlock } from "@/lib/site/blocks";

const ROUTE_REACT_BLOCKS: Record<string, Record<string, ComponentType>> = {
  [HOME_ROUTE]: HOME_REACT_BLOCKS,
  about: ABOUT_REACT_BLOCKS,
  anketa: ANKETA_REACT_BLOCKS,
  club: CLUB_REACT_BLOCKS,
  baza: BAZA_REACT_BLOCKS,
};

const exactBlockCache = new Map<string, ComponentType>();

export function getPageReactBlock(route: string, blockId: string): ComponentType {
  const routeBlocks = ROUTE_REACT_BLOCKS[route];
  if (routeBlocks && blockId in routeBlocks) {
    return routeBlocks[blockId];
  }

  const cacheKey = `${route}:${blockId}`;
  const cached = exactBlockCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const component = createLegacyBlockComponent(getPageBlock(route, blockId));
  exactBlockCache.set(cacheKey, component);
  return component;
}
