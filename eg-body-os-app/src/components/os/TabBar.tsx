"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/today", label: "TODAY" },
  { href: "/library", label: "LIBRARY" },
  { href: "/club", label: "CLUB" },
  { href: "/progress", label: "PROGRESS" },
  { href: "/me", label: "ME" },
] as const;

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-20 border-t border-white/10 bg-bg/92 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md"
      aria-label="Основная навигация"
    >
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex h-12 items-center justify-center text-[10px] font-medium tracking-[0.14em] ${
                  active ? "text-fg" : "text-muted"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
