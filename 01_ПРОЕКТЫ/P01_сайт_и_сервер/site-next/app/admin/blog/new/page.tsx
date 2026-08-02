import AdminBlogForm from "@/components/admin/AdminBlogForm";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminBlogNewPage() {
  await requireAdmin();
  return <AdminBlogForm mode="create" />;
}
