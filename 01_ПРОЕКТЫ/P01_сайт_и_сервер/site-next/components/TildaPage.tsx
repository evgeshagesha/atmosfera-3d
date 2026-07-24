import TildaBody from "@/components/TildaBody";

type PageMeta = {
  title: string;
  description: string;
  ogImage?: string;
};

type TildaPageProps = {
  body: string;
  meta: PageMeta;
  css: string[];
  js: string[];
  inlineScripts?: string[];
};

const CRITICAL_SCRIPTS = new Set([
  "/tilda/js/jquery-1.10.2.min.js",
  "/tilda/js/tilda-scripts-3.0.min.js",
]);

export default function TildaPage({
  body,
  css,
  js,
  inlineScripts = [],
}: TildaPageProps) {
  const deferred = js.filter((src) => !CRITICAL_SCRIPTS.has(src));

  return (
    <main>
      {css.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <TildaBody html={body} scripts={deferred} inlineScripts={inlineScripts} />
    </main>
  );
}
