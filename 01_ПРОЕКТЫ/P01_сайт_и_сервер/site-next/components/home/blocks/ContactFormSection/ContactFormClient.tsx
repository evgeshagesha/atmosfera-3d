"use client";

import { useEffect } from "react";

type ContactFormClientProps = {
  formId: string;
  popupHook: string;
};

export default function ContactFormClient({ formId, popupHook }: ContactFormClientProps) {
  useEffect(() => {
    const popup = document.querySelector<HTMLElement>(".t-popup");
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!popup || !form) return;

    const open = () => {
      popup.style.display = "block";
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    };

    close();

    const onHash = () => {
      if (window.location.hash === popupHook) open();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const opener = target.closest(`a[href="${popupHook}"]`);
      if (opener) {
        event.preventDefault();
        open();
        return;
      }

      if (target.closest(".t-popup__close-wrapper, .t-popup__block-close")) {
        event.preventDefault();
        close();
      }

      if (target === popup) {
        close();
      }
    };

    const syncContactMethod = () => {
      const selected = form.querySelector<HTMLInputElement>(
        'input[name="messenger-type"]:checked'
      );
      const method = selected?.value ?? "phone";
      form.querySelectorAll<HTMLElement>(".t-contact-method__value-container > div").forEach((el) => {
        el.style.display = "none";
      });
      const active = form.querySelector<HTMLElement>(`.t-contact-method__${method}-value`);
      if (active) active.style.display = "";
    };

    syncContactMethod();
    form.addEventListener("change", (event) => {
      const target = event.target as HTMLElement;
      if (target instanceof HTMLInputElement && target.name === "messenger-type") {
        syncContactMethod();
      }
    });

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

        const success = form.querySelector<HTMLElement>(".js-successbox");
        if (success) {
          success.style.display = "block";
        }
        form.querySelector<HTMLElement>(".t-form__inputsbox")?.style.setProperty("display", "none");
        form.reset();
        syncContactMethod();
      } catch {
        window.alert("Не удалось отправить заявку. Попробуйте позже или напишите в Telegram.");
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    form.addEventListener("submit", onSubmit);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
      form.removeEventListener("submit", onSubmit);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [formId, popupHook]);

  return null;
}
