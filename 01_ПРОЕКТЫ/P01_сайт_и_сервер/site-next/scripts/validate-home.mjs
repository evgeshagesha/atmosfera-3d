import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const manifest = JSON.parse(
  readFileSync(path.join(root, "data/blocks/index/manifest.json"), "utf8")
);

const registrySrc = readFileSync(path.join(root, "lib/home/block-registry.ts"), "utf8");

const registered = new Set();
for (const match of registrySrc.matchAll(/^\s+(rec\d+):/gm)) {
  registered.add(match[1]);
}
for (const match of registrySrc.matchAll(/LINE_DIVIDER_BLOCKS\.(rec\d+)/g)) {
  registered.add(match[1]);
}

const manifestIds = manifest.map((block) => block.id);
const missing = manifestIds.filter((id) => !registered.has(id));
const extra = [...registered].filter((id) => !manifestIds.includes(id));

if (missing.length === 0 && extra.length === 0) {
  console.log(`Home page OK: ${manifestIds.length} blocks registered.`);
  process.exit(0);
}

if (missing.length > 0) {
  console.error("Missing in block-registry.ts:", missing.join(", "));
}
if (extra.length > 0) {
  console.error("Extra in block-registry.ts:", extra.join(", "));
}
process.exit(1);
