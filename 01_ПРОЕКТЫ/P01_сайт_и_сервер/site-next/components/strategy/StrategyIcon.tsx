"use client";

import type { ReactNode } from "react";

export type StrategyIconName =
  | "person"
  | "calendar"
  | "chat"
  | "doc"
  | "support"
  | "scan"
  | "focus"
  | "start"
  | "discipline";

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
