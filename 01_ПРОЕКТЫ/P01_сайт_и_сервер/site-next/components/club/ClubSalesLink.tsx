"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { CLUB_SALES_OPEN, CLUB_TRIBUTE_TG } from "@/lib/club/landing-content";

type Props = {
  className?: string;
  children: ReactNode;
  /** Payment URL when sales are open. Defaults to Tribute TG. */
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

/**
 * Club join / pay CTA. Honours CLUB_SALES_OPEN from landing-content.
 * When closed: keeps the usual label, non-navigating, visually muted.
 */
export default function ClubSalesLink({
  className,
  children,
  href = CLUB_TRIBUTE_TG,
  ...rest
}: Props) {
  if (CLUB_SALES_OPEN) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { onClick: _onClick, ...closedRest } = rest;

  return (
    <span
      className={[className, "club-sales-cta--closed"].filter(Boolean).join(" ")}
      role="link"
      aria-disabled="true"
      title="Набор временно закрыт"
      {...closedRest}
    >
      {children}
    </span>
  );
}
