import type { ContentBlock } from "@/lib/content/article-blocks";

type ArticleContentProps = {
  blocks: ContentBlock[];
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const linkedParts = part.split(/(https?:\/\/[^\s]+)/g);
    return (
      <span key={index}>
        {linkedParts.map((linkedPart, linkedIndex) =>
          linkedPart.startsWith("http") ? (
            <a
              key={linkedIndex}
              href={linkedPart}
              target="_blank"
              rel="noreferrer"
            >
              {linkedPart}
            </a>
          ) : (
            <span key={linkedIndex}>{linkedPart}</span>
          ),
        )}
      </span>
    );
  });
}

export default function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <article className="article-content">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <p key={index} className="article-content__text">
              {renderInline(block.value)}
            </p>
          );
        }
        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          return (
            <Tag key={index} className="article-content__heading">
              {block.value}
            </Tag>
          );
        }
        if (block.type === "image" && block.url) {
          return (
            <figure key={index} className="article-content__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.url} alt={block.alt ?? ""} className="article-content__image" />
              {block.alt ? <figcaption>{block.alt}</figcaption> : null}
            </figure>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="article-content__quote">
              {renderInline(block.value)}
            </blockquote>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={index} className="article-content__list">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </Tag>
          );
        }
        return null;
      })}
    </article>
  );
}
