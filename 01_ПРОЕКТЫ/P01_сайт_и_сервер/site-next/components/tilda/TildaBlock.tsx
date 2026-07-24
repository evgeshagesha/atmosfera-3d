"use client";

type TildaBlockProps = {
  id: string;
  html: string;
};

export default function TildaBlock({ id, html }: TildaBlockProps) {
  return (
    <div
      data-tilda-block={id}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
