import Link from "next/link";
import type { ReactNode } from "react";

import SiteFooter from "@/components/home/blocks/SiteFooter";
import SiteHeader from "@/components/home/blocks/SiteHeader";

type LegalDocProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalDoc({ title, updated, children }: LegalDocProps) {
  return (
    <div className="eg-legal-page">
      <SiteHeader />
      <main className="eg-legal">
        <style dangerouslySetInnerHTML={{ __html: LEGAL_CSS }} />
        <div className="eg-legal__inner">
          <p className="eg-legal__eyebrow">Атмосфера 3D · Евгений Гошев</p>
          <h1>{title}</h1>
          <p className="eg-legal__updated">Редакция от {updated}</p>
          <div className="eg-legal__body">{children}</div>
          <p className="eg-legal__back">
            <Link href="/">← На главную</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const LEGAL_CSS = `
.eg-legal-page {
  background: #0a0c0f;
  color: #fff;
  min-height: 100dvh;
}
.eg-legal {
  padding: 48px 20px 72px;
}
.eg-legal__inner {
  width: min(820px, 100%);
  margin: 0 auto;
}
.eg-legal__eyebrow {
  margin: 0 0 10px;
  color: rgba(255,255,255,0.55);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.eg-legal h1 {
  margin: 0 0 12px;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.15;
}
.eg-legal__updated {
  margin: 0 0 28px;
  color: rgba(255,255,255,0.55);
  font-size: 13px;
}
.eg-legal__body {
  color: rgba(255,255,255,0.86);
  font-size: 15px;
  line-height: 1.65;
}
.eg-legal__body h2 {
  margin: 28px 0 12px;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 20px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
}
.eg-legal__body h3 {
  margin: 20px 0 8px;
  font-size: 16px;
  color: #fff;
}
.eg-legal__body p,
.eg-legal__body li {
  margin: 0 0 12px;
}
.eg-legal__body ul,
.eg-legal__body ol {
  margin: 0 0 16px;
  padding-left: 1.25em;
}
.eg-legal__body a {
  color: #d7dee8;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.eg-legal__body table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0 20px;
  font-size: 14px;
}
.eg-legal__body th,
.eg-legal__body td {
  border: 1px solid rgba(255,255,255,0.14);
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}
.eg-legal__body th {
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-weight: 700;
}
.eg-legal__note {
  margin: 18px 0;
  padding: 14px 16px;
  border: 1px solid rgba(210,220,232,0.2);
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.78);
  font-size: 14px;
}
.eg-legal__back {
  margin-top: 36px;
}
.eg-legal__back a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
}
.eg-legal__back a:hover {
  color: #fff;
}
`;
