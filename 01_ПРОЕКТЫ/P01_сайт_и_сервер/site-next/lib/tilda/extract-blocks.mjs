#!/usr/bin/env node
/**
 * Splits Tilda page bodies into per-block JSON files for 1:1 React rendering.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const DATA = path.join(ROOT, "data");

function sanitizeBlockHtml(html) {
  let result = html;
  const closingIdx = result.indexOf("<!--/allrecords-->");
  if (closingIdx !== -1) {
    result = result.slice(0, closingIdx);
  }
  result = result.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  return result.trim();
}

function extractBlocks(html) {
  const bodyEnd = html.indexOf("<!--/allrecords-->");
  const source = bodyEnd === -1 ? html : html.slice(0, bodyEnd);

  const blocks = [];
  const re = /<div id="(rec\d+)"[^>]*>/g;
  let match;
  const starts = [];

  while ((match = re.exec(source))) {
    starts.push({ id: match[1], start: match.index });
  }

  for (let i = 0; i < starts.length; i++) {
    const { id, start } = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1].start : source.length;
    const chunk = sanitizeBlockHtml(html.slice(start, end));
    const typeMatch = chunk.match(/data-record-type="(\d+)"/);
    const templateMatch = chunk.match(/<!-- T(\d+)/);
    blocks.push({
      id,
      recordType: typeMatch?.[1] ?? "",
      template: templateMatch ? `T${templateMatch[1]}` : "",
      html: chunk,
    });
  }

  return blocks;
}

function processPage(filename) {
  const pagePath = path.join(DATA, filename);
  if (!fs.existsSync(pagePath)) return 0;
  const page = JSON.parse(fs.readFileSync(pagePath, "utf8"));
  const route = page.route ?? filename.replace(".json", "");
  const outDir = path.join(DATA, "blocks", route || "index");
  fs.mkdirSync(outDir, { recursive: true });

  const blocks = extractBlocks(page.body);
  const manifest = blocks.map((b) => ({
    id: b.id,
    recordType: b.recordType,
    template: b.template,
  }));

  for (const block of blocks) {
    fs.writeFileSync(
      path.join(outDir, `${block.id}.json`),
      JSON.stringify(
        {
          id: block.id,
          recordType: block.recordType,
          template: block.template,
          html: block.html,
        },
        null,
        0
      )
    );
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`/${route || "home"}: ${blocks.length} blocks -> data/blocks/${route || "index"}/`);
  return blocks.length;
}

const manifest = JSON.parse(fs.readFileSync(path.join(DATA, "manifest.json"), "utf8"));
let total = 0;

for (const page of manifest.pages) {
  const filename = page.route === "" ? "index.json" : `${page.route}.json`;
  total += processPage(filename);
}

console.log(`\nTotal blocks extracted: ${total}`);
