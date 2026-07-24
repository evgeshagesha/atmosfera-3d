import { getPageBlockManifest } from "@/lib/site/blocks";
import { HOME_REACT_BLOCKS } from "@/lib/home/block-registry";

export type HomeValidationResult = {
  ok: boolean;
  missing: string[];
  extra: string[];
  total: number;
};

/** Ensures every block in data/blocks/index/manifest.json has a React implementation. */
export function validateHomePageRegistry(): HomeValidationResult {
  const manifestIds = getPageBlockManifest("").map((block) => block.id);
  const registryIds = Object.keys(HOME_REACT_BLOCKS);

  const missing = manifestIds.filter((id) => !registryIds.includes(id));
  const extra = registryIds.filter((id) => !manifestIds.includes(id));

  return {
    ok: missing.length === 0 && extra.length === 0,
    missing,
    extra,
    total: manifestIds.length,
  };
}

export function assertHomePageRegistry(): void {
  const result = validateHomePageRegistry();
  if (result.ok) return;

  const parts: string[] = [];
  if (result.missing.length > 0) {
    parts.push(`missing: ${result.missing.join(", ")}`);
  }
  if (result.extra.length > 0) {
    parts.push(`extra: ${result.extra.join(", ")}`);
  }

  throw new Error(`Home page registry is out of sync (${parts.join("; ")})`);
}
