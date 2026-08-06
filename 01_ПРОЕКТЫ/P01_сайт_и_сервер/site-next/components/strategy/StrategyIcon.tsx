"use client";

import type { ReactNode } from "react";

type IconName = "person" | "calendar" | "chat" | "doc" | "support";

const PATHS: Record<IconName, ReactNode> = {
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
};

export default function StrategyIcon({ name }: { name: IconName }) {
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
