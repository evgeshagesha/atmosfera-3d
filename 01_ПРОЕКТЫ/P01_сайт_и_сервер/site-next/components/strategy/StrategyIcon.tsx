"use client";

import type { ReactNode } from "react";

import type { StrategyIconName } from "@/lib/strategy/content";

export type { StrategyIconName };

const PATHS: Record<StrategyIconName, ReactNode> = {
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1.8-3.2 4-4.8 6.5-4.8s4.7 1.6 6.5 4.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" />
    </>
  ),
  calendar30: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M4 9.5h16" />
      <text
        x="12"
        y="17.2"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        30
      </text>
    </>
  ),
  chat: (
    <>
      <path d="M5 6.5h14v9.5H9.5L5 20v-3.5H5z" />
      <path d="M8.5 10.5h7M8.5 13.5h5" />
    </>
  ),
  doc: (
    <>
      <path d="M7 4.5h7l4 4v11H7z" />
      <path d="M14 4.5v4h4M9 12.5h6M9 15.5h6" />
    </>
  ),
  support: (
    <>
      <path d="M7 12a5 5 0 0 1 10 0" />
      <path d="M5.5 12v3.5a1.5 1.5 0 0 0 1.5 1.5H8.5v-5H7A1.5 1.5 0 0 0 5.5 12zM18.5 12v3.5a1.5 1.5 0 0 1-1.5 1.5H15.5v-5H17A1.5 1.5 0 0 1 18.5 12z" />
      <path d="M9 18.5h6" />
    </>
  ),
  scan: (
    <>
      <path d="M8 4.5H5.5v3M16 4.5h2.5v3M8 19.5H5.5v-3M16 19.5h2.5v-3" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 5v2.2M12 16.8V19M5 12h2.2M16.8 12H19" />
    </>
  ),
  start: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M10 8.8l6 3.2-6 3.2z" />
    </>
  ),
  discipline: (
    <>
      <path d="M5.5 12.5l4 4 9-9" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 2.5v2.2M21.5 12h-2.2" />
    </>
  ),
  chart: (
    <>
      <path d="M4.5 19.5h15" />
      <path d="M7 16.5v-4M12 16.5V8M17 16.5v-7" />
    </>
  ),
  lock: (
    <>
      <rect x="6" y="11" width="12" height="9" rx="1.5" />
      <path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  monitor: (
    <>
      <rect x="3.5" y="5" width="17" height="11.5" rx="1.5" />
      <path d="M9 19.5h6M12 16.5v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 3v5.2c0 4.2-2.8 7.4-7 8.8-4.2-1.4-7-4.6-7-8.8V6.5z" />
      <path d="M9.5 12.2l1.8 1.8 3.4-3.6" />
    </>
  ),
  cycle: (
    <>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.4-5.7L19 4.5v5h-5" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.4 5.7L5 19.5v-5h5" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2.5L6.5 13h5l-1 8.5L18.5 11h-5l-.5-8.5z" />
    </>
  ),
  walk: (
    <>
      <circle cx="13.5" cy="5" r="2" />
      <path d="M8 21l2.5-6 2 2 2.5 4M10.5 15l-2-4 4-2.5 3 2.5" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M6 9.5v5M18 9.5v5M8.5 12h7" />
      <rect x="3.5" y="8" width="3" height="8" rx="1" />
      <rect x="17.5" y="8" width="3" height="8" rx="1" />
    </>
  ),
  wave: (
    <>
      <path d="M3.5 14c2-3 3.5-3 5.5 0s3.5 3 5.5 0 3.5-3 5.5 0" />
      <path d="M3.5 9.5c2-3 3.5-3 5.5 0s3.5 3 5.5 0 3.5-3 5.5 0" />
    </>
  ),
  lungs: (
    <>
      <path d="M12 20.5V11" />
      <path d="M12 12c-2-.5-4.5-1-5.5-3.5C5.2 5.8 7 3.5 9.2 4.2c1.2.4 2 1.6 2.8 3.3" />
      <path d="M12 12c2-.5 4.5-1 5.5-3.5C18.8 5.8 17 3.5 14.8 4.2c-1.2.4-2 1.6-2.8 3.3" />
      <path d="M6.5 10.5c-1.8 1-2.8 3.2-2.3 5.3.6 2.4 2.8 3.7 4.8 3.2" />
      <path d="M17.5 10.5c1.8 1 2.8 3.2 2.3 5.3-.6 2.4-2.8 3.7-4.8 3.2" />
    </>
  ),
  heart: (
    <>
      <path d="M12 19.5s-7-4.2-7-9.2A3.8 3.8 0 0 1 12 7.5a3.8 3.8 0 0 1 7 2.8c0 5-7 9.2-7 9.2z" />
    </>
  ),
  utensils: (
    <>
      <path d="M8 3.5v7a2 2 0 0 0 2 2V20.5" />
      <path d="M6 3.5v4M10 3.5v4" />
      <path d="M16 3.5c2.2 0 3.5 1.4 3.5 3.5S18 11 16 11v9.5" />
    </>
  ),
  star: (
    <>
      <path d="M12 3.5l1.1 5.2L18.5 10l-4.2 3.1 1.4 5.4L12 15.6 8.3 18.5l1.4-5.4L5.5 10l5.4-1.3z" />
      <path d="M12 1.5v21M3 12h18" opacity="0.35" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </>
  ),
};

export default function StrategyIcon({
  name,
  className,
}: {
  name: StrategyIconName;
  className?: string;
}) {
  return (
    <svg
      className={className ? `st-icon ${className}` : "st-icon"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
