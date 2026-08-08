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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eg.egoshev.ru";
const AUTHOR_NAME = "Евгений Гошев";

/** Schedule via publishedAt: hide until slot without full redeploy. */
export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || !post.published) return {};

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.seoTitle?.trim() || `${post.title} — ${AUTHOR_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: "Атмосфера 3D",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: "Атмосфера 3D",
      locale: "ru_RU",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [AUTHOR_NAME],
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
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

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image
    ? new URL(post.image, SITE_URL).toString()
    : `${SITE_URL}/assets/eg/hero-evgeny-black.png`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "ru-RU",
    articleSection: post.category,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
      sameAs: ["https://t.me/EGoshev"],
    },
    publisher: {
      "@type": "Organization",
      name: "Атмосфера 3D",
      url: SITE_URL,
    },
  };

  return (
    <main className="blog-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
