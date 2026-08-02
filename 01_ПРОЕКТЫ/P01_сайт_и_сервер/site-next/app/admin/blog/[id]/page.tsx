import { notFound } from "next/navigation";

import AdminBlogForm from "@/components/admin/AdminBlogForm";
import { requireAdmin } from "@/lib/admin/session";
import { getBlogPostById } from "@/lib/content/blog";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlogEditRoute({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const post = getBlogPostById(id);
  if (!post) notFound();

  return <AdminBlogForm mode="edit" post={post} />;
}
