import { TabBar } from "@/components/os/TabBar";
import { requireSession } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireSession();

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex-1">{children}</div>
      <TabBar />
    </div>
  );
}
