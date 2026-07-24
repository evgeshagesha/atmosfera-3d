"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconDashboard, IconHome, IconLogout, IconPosts } from "@/components/admin/AdminIcons";

const NAV = [
  { href: "/admin", label: "Обзор", icon: IconDashboard, exact: true },
  { href: "/admin/blog", label: "Блог и статьи", icon: IconPosts },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__logo">EG</span>
        <div>
          <div className="admin-sidebar__title">Atmosphere</div>
          <div className="admin-sidebar__subtitle">Admin</div>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {NAV.map((item) => {
          const active =
            "exact" in item && item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link${active ? " is-active" : ""}`}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar__footer">
        <a href="/" target="_blank" rel="noreferrer" className="admin-sidebar__link">
          <IconHome />
          <span>Открыть сайт</span>
        </a>
        <button type="button" className="admin-sidebar__link admin-sidebar__button" onClick={logout}>
          <IconLogout />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
