"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError(
        response.status === 503
          ? "Админка не настроена на сервере (нужен ADMIN_PASSWORD)"
          : "Неверный пароль",
      );
      return;
    }

    const next = searchParams.get("next") || "/admin";
    router.replace(next);
    router.refresh();
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">Вход в админку</h1>
        <p className="admin-login__descr">EG Atmosphere — управление контентом сайта</p>
        <form className="admin-form" onSubmit={onSubmit}>
          <div className="admin-field">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
