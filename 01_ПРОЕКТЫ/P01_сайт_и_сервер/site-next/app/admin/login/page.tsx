import { Suspense } from "react";

import AdminLoginPage from "./AdminLoginPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-login" />}>
      <AdminLoginPage />
    </Suspense>
  );
}
