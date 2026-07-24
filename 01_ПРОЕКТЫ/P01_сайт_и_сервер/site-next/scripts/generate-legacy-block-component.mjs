#!/usr/bin/env node
/**
 * Generate a legacy HTML block component from data/blocks JSON.
 * Usage: node scripts/generate-legacy-block-component.mjs <route> <blockId> <ComponentName>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const [routeArg, blockId, componentName] = process.argv.slice(2);
if (!routeArg || !blockId || !componentName) {
  console.error(
    "Usage: node scripts/generate-legacy-block-component.mjs <route|index> <blockId> <ComponentName>"
  );
  process.exit(1);
}

const route = routeArg === "index" ? "" : routeArg;
const dir = path.join(ROOT, "data", "blocks", route === "" ? "index" : route);
const block = JSON.parse(fs.readFileSync(path.join(dir, `${blockId}.json`), "utf8"));
const constName = `${blockId.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}_HTML`;

const componentDir = path.join(
  ROOT,
  "components",
  route === "" ? "home" : route,
  "blocks",
  componentName
);

fs.mkdirSync(componentDir, { recursive: true });

fs.writeFileSync(
  path.join(componentDir, "html.ts"),
  `export const ${constName} = ${JSON.stringify(block.html)} as const;\n`
);

const tsx = `import { ${constName} } from "./html";

export default function ${componentName}() {
  return (
    <div
      data-site-block="${blockId}"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: ${constName} }}
    />
  );
}
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsx);
fs.writeFileSync(path.join(componentDir, "index.ts"), `export { default } from "./${componentName}";\n`);

console.log(`Generated ${componentDir}`);
