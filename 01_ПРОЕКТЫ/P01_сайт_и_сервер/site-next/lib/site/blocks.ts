import fs from "fs";
import path from "path";

export type SiteBlockData = {
  id: string;
  recordType: string;
  template: string;
  html: string;
};

export type SiteBlockManifestItem = {
  id: string;
  recordType: string;
  template: string;
};

const BLOCKS_DIR = path.join(process.cwd(), "data", "blocks");

function getBlocksDir(route: string) {
  return path.join(BLOCKS_DIR, route === "" ? "index" : route);
}

export function getPageBlockManifest(route: string): SiteBlockManifestItem[] {
  const raw = fs.readFileSync(path.join(getBlocksDir(route), "manifest.json"), "utf8");
  return JSON.parse(raw) as SiteBlockManifestItem[];
}

export function getPageBlock(route: string, id: string): SiteBlockData {
  const raw = fs.readFileSync(path.join(getBlocksDir(route), `${id}.json`), "utf8");
  return JSON.parse(raw) as SiteBlockData;
}

export function getAllPageBlocks(route: string): SiteBlockData[] {
  return getPageBlockManifest(route).map((item) => getPageBlock(route, item.id));
}

export function getHomeBlock(id: string): SiteBlockData {
  return getPageBlock("", id);
}
