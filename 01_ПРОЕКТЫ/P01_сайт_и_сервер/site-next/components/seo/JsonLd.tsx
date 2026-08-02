type JsonLdProps = {
  items: string[];
};

/** Canonical host for EG Next site (JSON-LD must not point at bare egoshev.ru). */
const SITE_ORIGIN = "https://eg.egoshev.ru";

function normalizeJsonLdPayload(item: string): string {
  return item
    .replaceAll("https://egoshev.ru", SITE_ORIGIN)
    .replaceAll("http://egoshev.ru", SITE_ORIGIN)
    .replace(/</g, "\\u003c");
}

export default function JsonLd({ items }: JsonLdProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: normalizeJsonLdPayload(item) }}
        />
      ))}
    </>
  );
}
