import fs from "fs";
import path from "path";

export type PageMeta = {
  title: string;
  description: string;
  ogImage?: string;
};

export type PageData = {
  route: string;
  meta: PageMeta;
  body: string;
  scripts?: string[];
  jsonLd?: string[];
  css?: string[];
  js?: string[];
};

export type Manifest = {
  css: string[];
  js: string[];
  pages: { route: string; meta: PageMeta }[];
};

const DATA_DIR = path.join(process.cwd(), "data");

export function getManifest(): Manifest {
  const raw = fs.readFileSync(path.join(DATA_DIR, "manifest.json"), "utf8");
  return JSON.parse(raw) as Manifest;
}

export function getPageData(route: string): PageData {
  const filename = route === "" ? "index.json" : `${route}.json`;
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf8");
  return JSON.parse(raw) as PageData;
}

export function getAllRoutes(): string[] {
  return getManifest().pages.map((p) => p.route).filter(Boolean);
}
