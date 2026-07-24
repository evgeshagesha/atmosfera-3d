import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import "../blog-article.css";
import ArticleContent from "@/components/blog/ArticleContent";
import {
  articleReadingMinutes,
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/content/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Евгений Гошев`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <main className="blog-article-page">
      <div className="blog-article-page__inner">
        <Link href="/" className="blog-article-page__back">
          ← На главную
        </Link>
        {post.category ? <p className="blog-article-page__category">{post.category}</p> : null}
        <h1 className="blog-article-page__title">{post.title}</h1>
        <p className="blog-article-page__meta">
          {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {articleReadingMinutes(post.content)} мин
        </p>
        {post.image ? (
          <div
            className="blog-article-page__cover"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        ) : null}
        {post.excerpt ? <p className="blog-article-page__excerpt">{post.excerpt}</p> : null}
        <ArticleContent blocks={post.content} />
      </div>
    </main>
  );
}
