import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin/session";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "blog");
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
]);

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase() || ".jpg";
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}${ext}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    }

    const allowedByName = /\.(jpe?g|png|gif|webp|avif)$/i.test(file.name);
    if (!ALLOWED_TYPES.has(file.type) && !allowedByName) {
      return NextResponse.json({ ok: false, error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "File too large (max 8 MB)" }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    const name = safeName(file.name);
    const bytes = await file.arrayBuffer();
    await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(bytes));

    return NextResponse.json({ ok: true, url: `/uploads/blog/${name}` });
  } catch {
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}
