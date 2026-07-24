"use client";

import { useEffect } from "react";

type SiteFormHandlerProps = {
  /** Scope queries to this block id */
  blockId: string;
  formSelector?: string;
};

/** Intercepts legacy HTML forms inside a block and posts to /api/contact. */
export default function SiteFormHandler({
  blockId,
  formSelector = "form",
}: SiteFormHandlerProps) {
  useEffect(() => {
    const root = document.getElementById(blockId);
    if (!root) return;

    const forms = Array.from(root.querySelectorAll<HTMLFormElement>(formSelector));
    if (forms.length === 0) return;

    const cleanups: Array<() => void> = [];

    for (const form of forms) {
      const onSubmit = async (event: Event) => {
        event.preventDefault();
        const data = new FormData(form);
        const payload = Object.fromEntries(data.entries());

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error("submit failed");

          const success = form.querySelector<HTMLElement>(".js-successbox, .t-form__successbox");
          if (success) success.style.display = "block";
          form.reset();
        } catch {
          window.alert("Не удалось отправить. Напишите в Telegram: @EGoshev");
        }
      };

      form.addEventListener("submit", onSubmit);
      cleanups.push(() => form.removeEventListener("submit", onSubmit));
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [blockId, formSelector]);

  return null;
}
