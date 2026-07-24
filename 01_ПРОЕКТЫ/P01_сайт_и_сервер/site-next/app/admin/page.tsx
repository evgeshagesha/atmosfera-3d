import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { IconPlus } from "@/components/admin/AdminIcons";
import { requireAdmin } from "@/lib/admin/session";
import { getAllBlogPosts } from "@/lib/content/blog";
import {
  ECOSYSTEM_DO_NOT_BUILD,
  ECOSYSTEM_METRICS,
  ECOSYSTEM_PHASES,
  ECOSYSTEM_PRODUCTS,
  getLiveProducts,
} from "@/lib/ecosystem";
import { HOME_PAGE_STATUS } from "@/lib/home/config";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const posts = getAllBlogPosts();
  const published = posts.filter((post) => post.published).length;
  const liveProducts = getLiveProducts().length;

  return (
    <AdminShell
      title="Обзор"
      description="Сайт и экосистема «Атмосфера 3D» по ТЗ: один маршрут от гайда до клуба и персональной работы."
    >
      <div className="admin-grid">
        <div className="admin-stat">
          <div className="admin-stat__label">Главная</div>
          <div className="admin-stat__value">{HOME_PAGE_STATUS.ready ? "Готова" : "В работе"}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Продуктов live</div>
          <div className="admin-stat__value">
            {liveProducts}/{ECOSYSTEM_PRODUCTS.length}
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Статей в блоге</div>
          <div className="admin-stat__value">{published}</div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card__title">Быстрые действия</h2>
        <p className="admin-card__text">
          Управляйте блогом на главной и проверяйте маршрут клиента на странице `/tree`.
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/admin/blog/new" className="admin-btn">
            <IconPlus />
            Новая статья
          </Link>
          <Link href="/tree" className="admin-btn admin-btn--ghost" target="_blank">
            Открыть /tree
          </Link>
        </div>
      </div>

      {ECOSYSTEM_PHASES.map((phase) => (
        <div className="admin-card" key={phase.id}>
          <h2 className="admin-card__title">{phase.title}</h2>
          <ul className="admin-card__text" style={{ margin: 0, paddingLeft: 18 }}>
            {phase.items.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="admin-card">
        <h2 className="admin-card__title">Метрики первых 100 клиентов</h2>
        <ul className="admin-card__text" style={{ margin: 0, paddingLeft: 18 }}>
          {ECOSYSTEM_METRICS.map((metric) => (
            <li key={metric} style={{ marginBottom: 8 }}>
              {metric}
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-card">
        <h2 className="admin-card__title">Не делаем на первом этапе</h2>
        <ul className="admin-card__text" style={{ margin: 0, paddingLeft: 18 }}>
          {ECOSYSTEM_DO_NOT_BUILD.map((item) => (
            <li key={item} style={{ marginBottom: 8 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}
