"use client";

import type { ReactNode } from "react";

export type StrategyIconName =
  | "person"
  | "calendar"
  | "calendar30"
  | "chat"
  | "doc"
  | "support"
  | "scan"
  | "focus"
  | "start"
  | "discipline"
  | "target"
  | "chart"
  | "lock"
  | "monitor"
  | "shield";

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
};

export default function StrategyIcon({ name }: { name: StrategyIconName }) {
  return (
    <svg
      className="st-icon"
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
