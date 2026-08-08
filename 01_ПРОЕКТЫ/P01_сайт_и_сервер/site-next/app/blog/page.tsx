import Image from "next/image";
import Link from "next/link";

import { blogPostHref, getBlogPosts } from "@/lib/content/blog";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

import "./blog-index.css";

/** Schedule via publishedAt: re-check date without full redeploy. */
export const dynamic = "force-dynamic";
export const revalidate = 300;

export const metadata = buildPageMetadata("blog", {
  title: "Блог о движении, дыхании и восстановлении — Евгений Гошев",
  description:
    "Статьи Евгения Гошева о биомеханике, физической терапии, дыхании, осанке, восстановлении и функциональном движении.",
  ogImage: "/assets/eg/hero-evgeny-black.png",
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <main className="blog-index">
      <div className="blog-index__inner">
        <Link href="/" className="blog-index__back">
          ← На главную
        </Link>
        <header className="blog-index__head">
          <p className="blog-index__eyebrow">Знания · практика · система</p>
          <h1>Блог и статьи</h1>
          <p>
            Материалы о движении, дыхании, восстановлении и грамотной
            прогрессии нагрузки.
          </p>
        </header>

        <div className="blog-index__grid">
          {posts.map((post, index) => (
            <article key={post.id} className="blog-index__card">
              <Link
                href={blogPostHref(post.slug)}
                className="blog-index__link"
                aria-label={`Открыть статью: ${post.title}`}
              >
                <div className="blog-index__image">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    preload={index === 0}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  />
                </div>
                <div className="blog-index__body">
                  {post.category ? (
                    <p className="blog-index__category">{post.category}</p>
                  ) : null}
                  <h2>{post.title}</h2>
                  <p className="blog-index__excerpt">{post.excerpt}</p>
                  <span className="blog-index__open">
                    Открыть статью <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
