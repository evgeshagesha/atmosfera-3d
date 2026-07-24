import type { ReactNode } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";

type AdminShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function AdminShell({ title, description, actions, children }: AdminShellProps) {
  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-header__title">{title}</h1>
            {description ? <p className="admin-header__descr">{description}</p> : null}
          </div>
          {actions ? <div className="admin-header__actions">{actions}</div> : null}
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
