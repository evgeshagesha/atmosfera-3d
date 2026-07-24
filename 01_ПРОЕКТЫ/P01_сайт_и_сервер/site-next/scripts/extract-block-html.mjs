#!/usr/bin/env node
/**
 * Extract block HTML from data/blocks into a TypeScript string export.
 * Usage: node scripts/extract-block-html.mjs <route> <blockId> <outputPath>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const [routeArg, blockId, outputPath] = process.argv.slice(2);
if (routeArg === undefined || !blockId || !outputPath) {
  console.error("Usage: node scripts/extract-block-html.mjs <route> <blockId> <outputPath>");
  process.exit(1);
}

const route = routeArg === "index" ? "" : routeArg;

const dir = path.join(ROOT, "data", "blocks", route === "" ? "index" : route);
const block = JSON.parse(fs.readFileSync(path.join(dir, `${blockId}.json`), "utf8"));
const constName = blockId.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase() + "_HTML";

const content = `export const ${constName} = ${JSON.stringify(block.html)} as const;\n`;
const out = path.join(ROOT, outputPath);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, content);
console.log("Wrote", out);
