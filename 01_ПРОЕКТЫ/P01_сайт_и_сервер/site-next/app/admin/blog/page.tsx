import Link from "next/link";

import AdminBlogList from "@/components/admin/AdminBlogList";
import AdminShell from "@/components/admin/AdminShell";
import { IconPlus } from "@/components/admin/AdminIcons";
import { requireAdmin } from "@/lib/admin/session";
import { getAllBlogPosts } from "@/lib/content/blog";

export default async function AdminBlogListPage() {
  await requireAdmin();
  const posts = getAllBlogPosts();

  return (
    <AdminShell
      title="Блог и статьи"
      description="Материалы для блока на главной странице. Карточки с обложками — как на сайте."
      actions={
        <Link href="/admin/blog/new" className="admin-btn">
          <IconPlus />
          Новая статья
        </Link>
      }
    >
      <AdminBlogList posts={posts} />
    </AdminShell>
  );
}
