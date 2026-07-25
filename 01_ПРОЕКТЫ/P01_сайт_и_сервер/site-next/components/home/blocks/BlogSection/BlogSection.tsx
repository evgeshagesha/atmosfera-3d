import Image from "next/image";
import Link from "next/link";

import { articleReadingMinutes, getBlogPosts } from "@/lib/content/blog";
import { BLOG_SECTION_STYLES } from "./styles";

export default function BlogSection() {
  // Keep the homepage light as the library grows: the full archive remains at /blog.
  const posts = getBlogPosts().slice(0, 8);

  return (
    <section
      id="rec2169195921"
      className="eg-blog"
      aria-labelledby="eg-blog-title"
    >
      <style dangerouslySetInnerHTML={{ __html: BLOG_SECTION_STYLES }} />

      <div className="eg-blog__inner">
        <header className="eg-blog__head">
          <p>База знаний EG</p>
          <h2 id="eg-blog-title">Блог и статьи</h2>
          <span>Разбор движения, восстановления и здоровья без крайностей</span>
        </header>

        <div className="eg-blog__grid" role="list">
          {posts.map((post) => (
            <article key={post.id} className="eg-blog-card" role="listitem">
              <Link
                href={`/blog/${post.slug}`}
                className="eg-blog-card__link"
                aria-label={`Открыть статью: ${post.title}`}
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 248px, (max-width: 960px) 280px, 290px"
                />
                <div className="eg-blog-card__overlay" />
                <div className="eg-blog-card__body">
                  <span className="eg-blog-card__meta">
                    {post.category || "Статья"} · {articleReadingMinutes(post.content)} мин
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="eg-blog-card__cta">
                    Читать <i aria-hidden="true">→</i>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Link href="/blog" className="eg-blog-all__link">
          Смотреть все статьи <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
