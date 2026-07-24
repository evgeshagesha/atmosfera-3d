import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd());

export function validateAboutPageRegistry(): { ok: boolean; missing: string[]; extra: string[] } {
  const manifest = JSON.parse(
    readFileSync(path.join(root, "data/blocks/about/manifest.json"), "utf8")
  ) as { id: string }[];

  const registrySrc = readFileSync(path.join(root, "lib/about/block-registry.ts"), "utf8");

  const registered = new Set<string>();
  for (const match of registrySrc.matchAll(/^\s+(rec\d+):/gm)) {
    registered.add(match[1]);
  }
  for (const match of registrySrc.matchAll(/ABOUT_LINE_DIVIDER_BLOCKS\.(rec\d+)/g)) {
    registered.add(match[1]);
  }

  const manifestIds = manifest.map((block) => block.id);
  const missing = manifestIds.filter((id) => !registered.has(id));
  const extra = [...registered].filter((id) => !manifestIds.includes(id));

  return { ok: missing.length === 0 && extra.length === 0, missing, extra };
}

export function assertAboutPageRegistry(): void {
  const { ok, missing, extra } = validateAboutPageRegistry();
  if (ok) return;

  if (missing.length > 0) {
    throw new Error(`Missing in about block-registry.ts: ${missing.join(", ")}`);
  }
  if (extra.length > 0) {
    throw new Error(`Extra in about block-registry.ts: ${extra.join(", ")}`);
  }
}
