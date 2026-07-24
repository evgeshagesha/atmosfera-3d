type JsonLdProps = {
  items: string[];
};

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
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </>
  );
}
