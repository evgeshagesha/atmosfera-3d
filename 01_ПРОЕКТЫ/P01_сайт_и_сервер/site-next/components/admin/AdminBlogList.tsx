import Link from "next/link";

import { blogPostHref, type BlogPost } from "@/lib/content/blog";

const DEFAULT_COVER =
  "/assets/tild3262-6531-4035-b061-356538643261/IMG_1547_2.PNG";

type AdminBlogListProps = {
  posts: BlogPost[];
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogList({ posts }: AdminBlogListProps) {
  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <>
      <div className="admin-grid admin-blog-stats">
        <div className="admin-stat">
          <div className="admin-stat__label">Всего статей</div>
          <div className="admin-stat__value">{posts.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Опубликовано</div>
          <div className="admin-stat__value">{publishedCount}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Черновики</div>
          <div className="admin-stat__value">{draftCount}</div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="admin-card admin-blog-empty">
          <h2 className="admin-card__title">Пока нет статей</h2>
          <p className="admin-card__text">
            Создайте первую публикацию — она появится в блоке «Блог и статьи» на главной.
          </p>
          <Link href="/admin/blog/new" className="admin-btn" style={{ marginTop: 16, width: "fit-content" }}>
            Новая статья
          </Link>
        </div>
      ) : (
        <div className="admin-blog-grid">
          {posts.map((post) => {
            const cover = post.image?.trim() || DEFAULT_COVER;

            return (
              <article key={post.id} className="admin-blog-card">
                <Link href={`/admin/blog/${post.id}`} className="admin-blog-card__cover-link">
                  <div
                    className="admin-blog-card__cover"
                    style={{ backgroundImage: `url('${cover}')` }}
                  />
                  <span
                    className={`admin-badge admin-blog-card__badge ${
                      post.published ? "is-live" : "is-draft"
                    }`}
                  >
                    {post.published ? "Опубликовано" : "Черновик"}
                  </span>
                </Link>

                <div className="admin-blog-card__body">
                  {post.category ? (
                    <p className="admin-blog-card__category">{post.category}</p>
                  ) : null}

                  <h2 className="admin-blog-card__title">
                    <Link href={`/admin/blog/${post.id}`}>{post.title}</Link>
                  </h2>

                  {post.excerpt ? (
                    <p className="admin-blog-card__excerpt">{post.excerpt}</p>
                  ) : null}

                  <div className="admin-blog-card__meta">
                    <span>Обновлено {formatDate(post.updatedAt)}</span>
                    <span className="admin-blog-card__slug">{blogPostHref(post.slug)}</span>
                  </div>

                  <div className="admin-blog-card__actions">
                    <Link href={`/admin/blog/${post.id}`} className="admin-btn admin-btn--ghost">
                      Редактировать
                    </Link>
                    {post.published ? (
                      <Link
                        href={blogPostHref(post.slug)}
                        className="admin-btn admin-btn--ghost"
                        target="_blank"
                      >
                        Открыть
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
