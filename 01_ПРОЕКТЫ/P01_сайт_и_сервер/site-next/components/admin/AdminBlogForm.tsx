"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import BlogArticleEditor from "@/components/admin/BlogArticleEditor";
import ArticleContent from "@/components/blog/ArticleContent";
import { generateExcerptFromBlocks, type ContentBlock } from "@/lib/content/article-blocks";
import {
  articleReadingMinutes,
  blogPostHref,
  normalizeBlogPost,
  slugifyBlogId,
  type BlogPost,
} from "@/lib/content/blog-types";

type AdminBlogFormProps = {
  post?: BlogPost;
  mode: "create" | "edit";
};

async function uploadBlogImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/admin/blog/upload", { method: "POST", body: formData });
  if (!response.ok) return null;
  const data = await response.json();
  return typeof data.url === "string" ? data.url : null;
}

export default function AdminBlogForm({ post, mode }: AdminBlogFormProps) {
  const router = useRouter();
  const initial = useMemo(
    () =>
      post ??
      normalizeBlogPost({
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        image: "",
        content: [{ type: "text", value: "" }],
        published: false,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    [post]
  );

  const [form, setForm] = useState<BlogPost>(initial);
  const [content, setContent] = useState<ContentBlock[]>(initial.content);
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onCoverSelect(file: File) {
    setCoverUploading(true);
    const url = await uploadBlogImage(file);
    setCoverUploading(false);
    if (url) update("image", url);
  }

  const autoSlug = slugifyBlogId(form.title);

  async function onSubmit(publish?: boolean) {
    setLoading(true);
    setError("");

    const payload = normalizeBlogPost({
      ...form,
      slug: autoSlug,
      id: form.id || autoSlug,
      content,
      excerpt: form.excerpt.trim() || generateExcerptFromBlocks(content, form.title),
      published: publish ?? form.published,
      updatedAt: new Date().toISOString(),
      publishedAt: form.publishedAt || new Date().toISOString(),
    });

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Не удалось сохранить");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  async function onDelete() {
    if (!form.id || !window.confirm("Удалить эту статью?")) return;
    setLoading(true);
    const response = await fetch(`/api/admin/blog?id=${encodeURIComponent(form.id)}`, {
      method: "DELETE",
    });
    setLoading(false);
    if (!response.ok) {
      setError("Не удалось удалить");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  const previewPost = normalizeBlogPost({ ...form, content });

  return (
    <AdminShell
      title={mode === "create" ? "Новая статья" : "Редактирование статьи"}
      description="Редактор в стиле Дзен: обложка, текст, фото в теле, предпросмотр."
      actions={
        <Link href="/admin/blog" className="admin-btn admin-btn--ghost">
          Назад
        </Link>
      }
    >
      <div className="admin-blog-layout">
        <aside className="admin-card admin-blog-sidebar">
          <div className="admin-field">
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              required
            />
          </div>
          <div className="admin-field">
            <label>URL</label>
            <p className="admin-help">
              {form.title.trim()
                ? `Будет доступна по адресу ${blogPostHref(autoSlug)}`
                : "URL сформируется автоматически из заголовка"}
            </p>
          </div>
          <div className="admin-field">
            <label htmlFor="category">Раздел</label>
            <input
              id="category"
              value={form.category ?? ""}
              onChange={(event) => update("category", event.target.value)}
              placeholder="Фундамент здоровья души и тела"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="excerpt">Краткое описание для карточки</label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              rows={4}
            />
          </div>
          <div className="admin-field">
            <label>Обложка</label>
            {form.image ? (
              <div
                className="admin-blog-cover"
                style={{ backgroundImage: `url('${form.image}')` }}
              />
            ) : null}
            <label className="admin-btn admin-btn--ghost admin-file-btn">
              {coverUploading ? "Загрузка…" : "Загрузить с устройства"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) void onCoverSelect(file);
                }}
              />
            </label>
            <input
              value={form.image}
              onChange={(event) => update("image", event.target.value)}
              placeholder="/uploads/blog/..."
            />
          </div>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => update("published", event.target.checked)}
            />
            Опубликовано на главной
          </label>
          <p className="admin-help">
            ~{articleReadingMinutes(content)} мин чтения
            {form.title.trim() ? ` · ${blogPostHref(autoSlug)}` : ""}
          </p>
        </aside>

        <section className="admin-card admin-blog-main">
          <div className="admin-blog-tabs">
            <button
              type="button"
              className={tab === "edit" ? "is-active" : ""}
              onClick={() => setTab("edit")}
            >
              Редактор
            </button>
            <button
              type="button"
              className={tab === "preview" ? "is-active" : ""}
              onClick={() => setTab("preview")}
            >
              Предпросмотр
            </button>
          </div>

          {tab === "edit" ? (
            <BlogArticleEditor
              initialBlocks={content}
              onChange={setContent}
              uploadImage={uploadBlogImage}
            />
          ) : (
            <div className="admin-blog-preview">
              {previewPost.image ? (
                <div
                  className="admin-blog-preview-cover"
                  style={{ backgroundImage: `url('${previewPost.image}')` }}
                />
              ) : null}
              <p className="admin-blog-preview-meta">
                {previewPost.category ? `${previewPost.category} · ` : ""}
                {articleReadingMinutes(previewPost.content)} мин
              </p>
              <h1>{previewPost.title}</h1>
              <p className="admin-blog-preview-excerpt">{previewPost.excerpt}</p>
              <ArticleContent blocks={previewPost.content} />
            </div>
          )}

          {error ? <p className="admin-error">{error}</p> : null}
          <div className="admin-blog-actions">
            <button type="button" className="admin-btn" disabled={loading} onClick={() => onSubmit()}>
              {loading ? "Сохраняем…" : "Сохранить"}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              disabled={loading}
              onClick={() => onSubmit(true)}
            >
              Опубликовать
            </button>
            {mode === "edit" ? (
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                disabled={loading}
                onClick={onDelete}
              >
                Удалить
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
