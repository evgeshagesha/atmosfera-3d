import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FEED_UID = "560855153841";
const REC_ID = "2169195921";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPLOAD_DIR = path.join(ROOT, "public/uploads/blog");
const BLOG_PATH = path.join(ROOT, "data/blog.json");

const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya",
};

function slugifyBlogTitle(title) {
  const cleaned = title.replace(/^[\s"'«»]+|[\s"'«»]+$/g, "").trim();
  const transliterated = cleaned
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return transliterated || `post-${Date.now()}`;
}

function ensureUniqueSlug(base, used) {
  if (!used.has(base)) return base;
  let index = 2;
  while (used.has(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}


function localAssetUrl(remoteUrl, uid, kind) {
  try {
    const parsed = new URL(remoteUrl);
    const filename = path.basename(parsed.pathname);
    return `/uploads/blog/${uid}-${kind}-${filename}`;
  } catch {
    return remoteUrl;
  }
}

async function downloadAsset(remoteUrl, destRelative) {
  if (!remoteUrl || remoteUrl.startsWith("/")) return remoteUrl;
  const destPath = path.join(ROOT, "public", destRelative.replace(/^\//, ""));
  await mkdir(path.dirname(destPath), { recursive: true });
  const response = await fetch(remoteUrl);
  if (!response.ok) throw new Error(`Failed ${remoteUrl}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destPath, buffer);
  return destRelative;
}

function htmlToBlocks(html) {
  const blocks = [];
  if (!html?.trim()) return [{ type: "text", value: "" }];

  let source = html;
  const images = [...source.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  for (const match of images) {
    blocks.push({ type: "image", url: match[1] });
    source = source.replace(match[0], "\n");
  }

  const strip = (value) =>
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  source = source
    .replace(/<\/(p|div|h2|h3|blockquote|li)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const paragraphs = source
    .split(/\n{2,}/)
    .map(strip)
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    const last = blocks[blocks.length - 1];
    if (last?.type === "text") last.value = `${last.value}\n\n${paragraph}`;
    else blocks.push({ type: "text", value: paragraph });
  }

  return blocks.length ? blocks : [{ type: "text", value: "" }];
}

async function fetchFeed() {
  const url = `https://feeds.tildacdn.com/api/getfeed/?feeduid=${FEED_UID}&recid=${REC_ID}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Feed ${response.status}`);
  const data = await response.json();
  return data.posts ?? [];
}

async function fetchPost(uid) {
  const url = `https://feeds.tildacdn.com/api/getpost/?postuid=${uid}&feeduid=${FEED_UID}&recid=${REC_ID}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Post ${uid}: ${response.status}`);
  const data = await response.json();
  return data.post;
}

async function main() {
  const feedPosts = await fetchFeed();
  console.log(`Found ${feedPosts.length} posts in Tilda feed`);

  const posts = [];
  const usedSlugs = new Set();
  for (const item of feedPosts) {
    const uid = item.uid;
    const title = String(item.title ?? "").replace(/^["']|["']$/g, "").trim();
    const slug = ensureUniqueSlug(slugifyBlogTitle(title), usedSlugs);
    usedSlugs.add(slug);
    const category = String(item.parts ?? "").split(",")[0]?.trim() || undefined;

    let image = item.image || item.mediadata || "";
    if (image.startsWith("http")) {
      const localImage = localAssetUrl(image, uid, "cover");
      image = await downloadAsset(image, localImage);
    }

    let content = [{ type: "text", value: String(item.descr ?? "").trim() }];
    if (item.needGetPost) {
      const full = await fetchPost(uid);
      const blocks = htmlToBlocks(full.text || "");
      for (const block of blocks) {
        if (block.type === "image" && block.url.startsWith("http")) {
          const local = localAssetUrl(block.url, uid, `img-${blocks.indexOf(block)}`);
          block.url = await downloadAsset(block.url, local);
        }
      }
      if (blocks.length) content = blocks;
    }

    const publishedAt = new Date(item.published || item.date || Date.now()).toISOString();
    posts.push({
      id: slug,
      slug,
      title,
      excerpt: String(item.descr ?? "").trim(),
      image,
      category,
      content,
      published: true,
      publishedAt,
      updatedAt: publishedAt,
      tildaUid: uid,
      href: `/blog/${slug}`,
    });
    console.log(`Imported: ${title}`);
  }

  await writeFile(BLOG_PATH, `${JSON.stringify({ posts }, null, 2)}\n`, "utf8");
  console.log(`Saved ${posts.length} posts to data/blog.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
