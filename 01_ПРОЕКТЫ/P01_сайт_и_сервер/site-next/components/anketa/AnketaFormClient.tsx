"use client";

import { useEffect } from "react";

const TELEGRAM_URL = "https://t.me/EGoshev";

function value(id: string) {
  const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
  return el?.value.trim() ?? "";
}

function groupRadio(name: string) {
  const el = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return el?.value ?? "";
}

function groupChecked(dataName: string) {
  return Array.from(
    document.querySelectorAll<HTMLInputElement>(`input[data-name="${dataName}"]:checked`)
  ).map((el) => el.value);
}

export default function AnketaFormClient() {
  useEffect(() => {
    const form = document.getElementById("bf") as HTMLFormElement | null;
    if (!form) return;

    const zones = new Set<string>();
    const cleanups: Array<() => void> = [];

    const onScroll = () => {
      const el = document.documentElement;
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      const bar = document.getElementById("pbf");
      if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    form.querySelectorAll<HTMLElement>(".rcd").forEach((card) => {
      const onClick = (event: Event) => {
        if ((event.target as HTMLElement).tagName === "INPUT") return;
        const input = card.querySelector<HTMLInputElement>("input");
        if (!input) return;
        const name = input.name;
        form.querySelectorAll<HTMLElement>(`.rcd input[name="${name}"]`).forEach((el) => {
          el.closest(".rcd")?.classList.remove("ck");
        });
        input.checked = true;
        card.classList.add("ck");
      };
      card.addEventListener("click", onClick);
      cleanups.push(() => card.removeEventListener("click", onClick));
    });

    form.querySelectorAll<HTMLElement>(".pl").forEach((pill) => {
      const input = pill.querySelector<HTMLInputElement>("input");
      if (!input) return;

      const onClick = (event: Event) => {
        if ((event.target as HTMLElement).tagName === "INPUT") return;
        event.preventDefault();

        if (input.type === "radio") {
          form.querySelectorAll<HTMLInputElement>(`input[name="${input.name}"]`).forEach((el) => {
            el.checked = false;
            el.closest(".pl")?.classList.remove("ck");
          });
          input.checked = true;
          pill.classList.add("ck");
        } else {
          input.checked = !input.checked;
          pill.classList.toggle("ck", input.checked);
        }
      };

      const onChange = () => pill.classList.toggle("ck", input.checked);

      pill.addEventListener("click", onClick);
      input.addEventListener("change", onChange);
      cleanups.push(() => {
        pill.removeEventListener("click", onClick);
        input.removeEventListener("change", onChange);
      });
    });

    const updateZones = () => {
      const label = document.getElementById("pzd");
      const hidden = document.getElementById("pzf") as HTMLInputElement | null;
      if (label) {
        label.innerHTML =
          zones.size === 0
            ? "Отмеченные зоны: <strong>пока нет</strong>"
            : `Отмеченные зоны: <strong>${Array.from(zones).join(", ")}</strong>`;
      }
      if (hidden) hidden.value = zones.size ? Array.from(zones).join(", ") : "не отмечено";
    };

    form.querySelectorAll<SVGElement>(".bz").forEach((zone) => {
      const onClick = () => {
        const name = zone.getAttribute("data-zone");
        if (!name) return;
        if (zones.has(name)) {
          zones.delete(name);
          zone.classList.remove("sel");
        } else {
          zones.add(name);
          zone.classList.add("sel");
        }
        updateZones();
      };
      zone.addEventListener("click", onClick);
      cleanups.push(() => zone.removeEventListener("click", onClick));
    });

    for (const id of ["pl", "st", "cm"]) {
      const input = document.getElementById(id) as HTMLInputElement | null;
      const display = document.getElementById(`${id}v`);
      if (!input || !display) continue;

      const onInput = () => {
        display.textContent = input.value;
      };
      input.addEventListener("input", onInput);
      cleanups.push(() => input.removeEventListener("input", onInput));
    }

    const buildText = () => {
      const lines: string[] = [];
      lines.push("🌿 АНКЕТА КЛИЕНТА — АТМОСФЕРА 3D");
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push("\n👤 ЗНАКОМСТВО");
      lines.push(`Имя: ${value("name")}`);
      lines.push(
        `Возраст: ${value("age")}${value("height") ? ` · Рост: ${value("height")}` : ""}${value("weight") ? ` · Вес: ${value("weight")}` : ""}`
      );
      lines.push(`Город: ${value("city")}`);
      lines.push(`Телефон: ${value("phone")}`);
      if (value("email")) lines.push(`Email: ${value("email")}`);
      lines.push(`Связь: ${groupChecked("msg").join(", ")}`);
      lines.push("\n🎯 ФОРМАТ И ЗАПРОС");
      lines.push(`Формат: ${groupRadio("format")}`);
      lines.push(`Запрос: ${value("request")}`);
      if (groupChecked("src").length) lines.push(`Откуда узнал: ${groupChecked("src").join(", ")}`);
      lines.push("\n📍 КАРТА ТЕЛА");
      lines.push(`Зоны: ${zones.size ? Array.from(zones).join(", ") : "не отмечено"}`);
      if (value("pdesc")) lines.push(`Описание: ${value("pdesc")}`);
      lines.push(`Интенсивность: ${value("pl")}/10`);
      lines.push("\n📜 ИСТОРИЯ ТЕЛА");
      lines.push(`Травмы: ${value("inj")}`);
      lines.push(`Операции: ${value("surg")}`);
      if (value("chr")) lines.push(`Хроника: ${value("chr")}`);
      if (value("med")) lines.push(`Лекарства: ${value("med")}`);
      if (groupChecked("spec").length) lines.push(`Особые состояния: ${groupChecked("spec").join(", ")}`);
      if (groupRadio("da")) lines.push(`Разрешение врача: ${groupRadio("da")}`);
      lines.push("\n🔄 ЧТО ПРОБОВАЛ");
      if (groupChecked("tr").length) lines.push(`Методы: ${groupChecked("tr").join(", ")}`);
      if (value("trd")) lines.push(`Детали: ${value("trd")}`);
      if (groupRadio("ps")) lines.push(`Вкладывал в год: ${groupRadio("ps")}`);
      lines.push("\n🫁 ТЕЛО СЕЙЧАС");
      if (groupRadio("br")) lines.push(`Дыхание: ${groupRadio("br")}`);
      if (value("post")) lines.push(`Осанка: ${value("post")}`);
      if (groupChecked("ft").length) lines.push(`Стопы: ${groupChecked("ft").join(", ")}`);
      lines.push(`Активность: ${value("act")}`);
      if (groupRadio("sit")) lines.push(`Сидячая работа: ${groupRadio("sit")}`);
      if (value("prof")) lines.push(`Профессия: ${value("prof")}`);
      lines.push("\n☀️ ОБРАЗ ЖИЗНИ");
      if (groupRadio("sl")) lines.push(`Сон: ${groupRadio("sl")}`);
      if (groupRadio("slh")) lines.push(`Часов сна: ${groupRadio("slh")}`);
      if (groupRadio("et")) lines.push(`Еда: ${groupRadio("et")}`);
      if (groupRadio("wt")) lines.push(`Вода: ${groupRadio("wt")}`);
      if (value("hab")) lines.push(`Привычки: ${value("hab")}`);
      lines.push(`Стресс: ${value("st")}/10`);
      lines.push("\n🧠 ГОТОВНОСТЬ");
      if (value("bl")) lines.push(`Что останавливало: ${value("bl")}`);
      if (groupChecked("sp").length) lines.push(`Поддержка: ${groupChecked("sp").join(", ")}`);
      if (groupRadio("wh")) lines.push(`Часов в неделю: ${groupRadio("wh")}`);
      lines.push(`Готовность: ${value("cm")}/10`);
      lines.push("\n🎯 ЦЕЛИ");
      lines.push(`Через 3 мес: ${value("g3")}`);
      if (value("g12")) lines.push(`Через 6–12 мес: ${value("g12")}`);
      if (groupRadio("bg")) lines.push(`Бюджет/мес: ${groupRadio("bg")}`);
      if (groupRadio("wn")) lines.push(`Когда начать: ${groupRadio("wn")}`);
      if (value("ex") || value("qm")) {
        lines.push("\n💬 ДОПОЛНИТЕЛЬНО");
        if (value("ex")) lines.push(`Важно знать: ${value("ex")}`);
        if (value("qm")) lines.push(`Вопросы ко мне: ${value("qm")}`);
      }
      lines.push("\n✅ Согласия: оферта, ПД, данные о здоровье, достоверность.");
      if ((document.getElementById("l5") as HTMLInputElement | null)?.checked) {
        lines.push("✅ Согласен на материалы");
      }
      return lines.join("\n");
    };

    const validate = () => {
      const required = [
        { id: "name", label: "Имя" },
        { id: "age", label: "Возраст" },
        { id: "city", label: "Город" },
        { id: "phone", label: "Телефон" },
        { id: "request", label: "Запрос" },
        { id: "inj", label: "Травмы" },
        { id: "surg", label: "Операции" },
        { id: "act", label: "Активность" },
        { id: "g3", label: "Цель на 3 мес" },
      ];
      const errors: string[] = [];
      for (const field of required) {
        if (!value(field.id)) errors.push(field.label);
      }
      if (!groupRadio("format")) errors.push("Формат работы");
      if (!groupChecked("msg").length) errors.push("Мессенджер");
      for (const id of ["l1", "l2", "l3", "l4"]) {
        if (!(document.getElementById(id) as HTMLInputElement | null)?.checked) {
          if (!errors.includes("Согласия в конце")) errors.push("Согласия в конце");
        }
      }
      return errors;
    };

    const copyText = async (text: string) => {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          return;
        } catch {
          // fallback below
        }
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      textarea.remove();
    };

    const copyBtn = document.getElementById("cbtn");
    const submitBtn = document.getElementById("sbtn");
    const copyMsg = document.getElementById("cmsg");
    const submitMsg = document.getElementById("smsg");
    const hiddenText = document.getElementById("bft") as HTMLInputElement | null;

    const requiredConsentIds = ["l1", "l2", "l3", "l4"] as const;

    const syncSubmitEnabled = () => {
      const ok = requiredConsentIds.every(
        (id) => (document.getElementById(id) as HTMLInputElement | null)?.checked
      );
      if (!submitBtn) return;
      submitBtn.setAttribute("aria-disabled", ok ? "false" : "true");
      submitBtn.style.pointerEvents = ok ? "" : "none";
      submitBtn.style.opacity = ok ? "" : "0.45";
      if (!ok) {
        submitBtn.setAttribute("title", "Отметьте обязательные согласия");
      } else {
        submitBtn.removeAttribute("title");
      }
    };

    for (const id of requiredConsentIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.addEventListener("change", syncSubmitEnabled);
      cleanups.push(() => el.removeEventListener("change", syncSubmitEnabled));
    }
    syncSubmitEnabled();

    const onCopy = async () => {
      const text = buildText();
      await copyText(text);
      copyMsg?.classList.add("vs");
      submitMsg?.classList.remove("vs");
      if (copyBtn) {
        copyBtn.textContent = "✓ Скопировано";
        window.setTimeout(() => {
          copyBtn.textContent = "Скопировать текст";
        }, 3000);
      }
    };

    const onSubmit = async (event: Event) => {
      const errors = validate();
      if (errors.length) {
        event.preventDefault();
        window.alert(`Заполните обязательные поля (*):\n\n— ${errors.join("\n— ")}`);
        return;
      }

      event.preventDefault();
      if (submitBtn?.getAttribute("aria-disabled") === "true") return;
      const text = buildText();
      if (hiddenText) hiddenText.value = text;
      await copyText(text);

      if (submitMsg) {
        submitMsg.innerHTML =
          '✓ Анкета скопирована в буфер обмена. Открывается чат с Евгением — <strong>вставьте текст и отправьте</strong>.<br><br>Если чат не открылся автоматически — нажмите: <a href="https://t.me/EGoshev" target="_blank">→ Открыть @EGoshev</a>';
        submitMsg.classList.add("vs");
      }
      copyMsg?.classList.remove("vs");
      window.setTimeout(() => submitMsg?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
      window.open(TELEGRAM_URL, "_blank", "noopener");
    };

    copyBtn?.addEventListener("click", onCopy);
    submitBtn?.addEventListener("click", onSubmit);
    cleanups.push(() => {
      copyBtn?.removeEventListener("click", onCopy);
      submitBtn?.removeEventListener("click", onSubmit);
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}
