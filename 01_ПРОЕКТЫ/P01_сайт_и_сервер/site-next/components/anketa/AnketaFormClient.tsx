"use client";

import { useEffect } from "react";

const SUBMIT_ENDPOINT = "/api/anketa/submit";
const LS_KEY = "eg_anketa_intake_v1";
const SITE_URL = "https://eg.egoshev.ru";

function value(id: string) {
  const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
  return el?.value.trim() ?? "";
}

function setValue(id: string, next: string) {
  const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
  if (el) el.value = next;
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

function setCheckedByValues(dataName: string, values: string[]) {
  const set = new Set(values);
  document.querySelectorAll<HTMLInputElement>(`input[data-name="${dataName}"]`).forEach((el) => {
    el.checked = set.has(el.value);
    el.closest(".pl")?.classList.toggle("ck", el.checked);
    el.closest(".rcd")?.classList.toggle("ck", el.checked);
  });
}

function setRadio(name: string, next: string) {
  document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((el) => {
    el.checked = el.value === next;
    el.closest(".pl")?.classList.toggle("ck", el.checked);
    el.closest(".rcd")?.classList.toggle("ck", el.checked);
  });
}

type StoredDraft = {
  fields?: Record<string, string>;
  radios?: Record<string, string>;
  checks?: Record<string, string[]>;
  zones?: string[];
  consents?: Record<string, boolean>;
};

export default function AnketaFormClient() {
  useEffect(() => {
    const form = document.getElementById("bf") as HTMLFormElement | null;
    if (!form) return;

    const zones = new Set<string>();
    const cleanups: Array<() => void> = [];
    let submitLocked = false;
    let saveTimer: ReturnType<typeof setTimeout> | null = null;

    // Honeypot (not in exported HTML)
    if (!form.querySelector('[name="company_website"]')) {
      const hp = document.createElement("input");
      hp.type = "text";
      hp.name = "company_website";
      hp.id = "company_website";
      hp.tabIndex = -1;
      hp.autocomplete = "off";
      hp.setAttribute("aria-hidden", "true");
      hp.style.cssText =
        "position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none";
      form.prepend(hp);
    }

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
        schedulePersist();
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
        schedulePersist();
      };

      const onChange = () => {
        pill.classList.toggle("ck", input.checked);
        schedulePersist();
      };

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
        schedulePersist();
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
        schedulePersist();
      };
      input.addEventListener("input", onInput);
      cleanups.push(() => input.removeEventListener("input", onInput));
    }

    const textFieldIds = [
      "name",
      "age",
      "height",
      "weight",
      "city",
      "phone",
      "email",
      "request",
      "pdesc",
      "inj",
      "surg",
      "chr",
      "med",
      "trd",
      "post",
      "act",
      "prof",
      "hab",
      "bl",
      "g3",
      "g12",
      "ex",
      "qm",
      "pl",
      "st",
      "cm",
    ] as const;

    const radioNames = ["format", "da", "ps", "br", "sit", "sl", "slh", "et", "wt", "wh", "bg", "wn"] as const;
    const checkNames = ["msg", "src", "spec", "tr", "ft", "sp"] as const;
    const requiredConsentIds = ["l1", "l2", "l3", "l4"] as const;

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

    const serializeDraft = (): StoredDraft => {
      const fields: Record<string, string> = {};
      for (const id of textFieldIds) {
        const v = value(id);
        if (v) fields[id] = v;
      }
      const radios: Record<string, string> = {};
      for (const name of radioNames) {
        const v = groupRadio(name);
        if (v) radios[name] = v;
      }
      const checks: Record<string, string[]> = {};
      for (const name of checkNames) {
        const v = groupChecked(name);
        if (v.length) checks[name] = v;
      }
      const consents: Record<string, boolean> = {};
      for (const id of [...requiredConsentIds, "l5"] as const) {
        consents[id] = Boolean(
          (document.getElementById(id) as HTMLInputElement | null)?.checked
        );
      }
      return {
        fields,
        radios,
        checks,
        zones: Array.from(zones),
        consents,
      };
    };

    const persist = () => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(serializeDraft()));
      } catch {
        // quota / private mode
      }
    };

    const schedulePersist = () => {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(persist, 400);
    };

    const restoreDraft = () => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw) as StoredDraft;
        if (draft.fields) {
          for (const [id, v] of Object.entries(draft.fields)) {
            setValue(id, v);
            const display = document.getElementById(`${id}v`);
            if (display && (id === "pl" || id === "st" || id === "cm")) {
              display.textContent = v;
            }
          }
        }
        if (draft.radios) {
          for (const [name, v] of Object.entries(draft.radios)) {
            setRadio(name, v);
          }
        }
        if (draft.checks) {
          for (const [name, values] of Object.entries(draft.checks)) {
            setCheckedByValues(name, values);
          }
        }
        if (draft.zones?.length) {
          zones.clear();
          form.querySelectorAll<SVGElement>(".bz").forEach((zone) => {
            const name = zone.getAttribute("data-zone");
            if (name && draft.zones!.includes(name)) {
              zones.add(name);
              zone.classList.add("sel");
            }
          });
          updateZones();
        }
        if (draft.consents) {
          for (const [id, checked] of Object.entries(draft.consents)) {
            const el = document.getElementById(id) as HTMLInputElement | null;
            if (el) el.checked = checked;
          }
        }
      } catch {
        // ignore corrupt draft
      }
    };

    const clearDraft = () => {
      try {
        localStorage.removeItem(LS_KEY);
      } catch {
        // ignore
      }
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
      for (const id of requiredConsentIds) {
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
    const subs = form.querySelector<HTMLElement>(".subs");

    // Normalize CTA copy to «Отправить»
    if (submitBtn) {
      submitBtn.textContent = "Отправить";
      submitBtn.removeAttribute("href");
      submitBtn.removeAttribute("target");
      submitBtn.setAttribute("role", "button");
      if (submitBtn.tagName === "A") {
        (submitBtn as HTMLAnchorElement).href = "#";
      }
    }
    if (subs) {
      const lead = subs.querySelector<HTMLElement>(".subd");
      if (lead) {
        lead.textContent =
          "Нажмите «Отправить» — анкета уйдёт в систему записи. Мы свяжемся и пригласим на приём.";
      }
    }

    const setSubmitBusy = (busy: boolean) => {
      if (!submitBtn) return;
      if (busy) {
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.opacity = "0.55";
        submitBtn.textContent = "Отправляю…";
      } else {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = "Отправить";
        syncSubmitEnabled();
      }
    };

    const syncSubmitEnabled = () => {
      const ok = requiredConsentIds.every(
        (id) => (document.getElementById(id) as HTMLInputElement | null)?.checked
      );
      if (!submitBtn) return;
      submitBtn.setAttribute("aria-disabled", ok ? "false" : "true");
      if (!submitLocked) {
        submitBtn.style.pointerEvents = ok ? "" : "none";
        submitBtn.style.opacity = ok ? "" : "0.45";
      }
      if (!ok) {
        submitBtn.setAttribute("title", "Отметьте обязательные согласия");
      } else {
        submitBtn.removeAttribute("title");
      }
    };

    for (const id of requiredConsentIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const onChange = () => {
        syncSubmitEnabled();
        schedulePersist();
      };
      el.addEventListener("change", onChange);
      cleanups.push(() => el.removeEventListener("change", onChange));
    }

    const onFormInput = () => schedulePersist();
    form.addEventListener("input", onFormInput);
    cleanups.push(() => form.removeEventListener("input", onFormInput));

    restoreDraft();
    syncSubmitEnabled();

    const showError = (message: string) => {
      if (!submitMsg) return;
      submitMsg.className = "sm vs";
      submitMsg.style.color = "#fca5a5";
      submitMsg.style.background = "rgba(248,113,113,0.08)";
      submitMsg.style.border = "1px solid rgba(248,113,113,0.28)";
      submitMsg.innerHTML = `${message}<br><br><button type="button" class="bsec" id="anketaRetryBtn" style="margin-top:8px">Повторить отправку</button>`;
      copyMsg?.classList.remove("vs");
      window.setTimeout(() => submitMsg.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
      const retry = document.getElementById("anketaRetryBtn");
      retry?.addEventListener("click", () => {
        void doSubmit();
      });
    };

    const showSuccessScreen = () => {
      const host =
        form.closest<HTMLElement>(".cnt") ||
        form.parentElement ||
        document.body;

      form.style.display = "none";
      document.getElementById("anketaSuccess")?.remove();

      const panel = document.createElement("div");
      panel.id = "anketaSuccess";
      panel.className = "subs";
      panel.setAttribute("role", "status");
      panel.innerHTML = `
        <h3 style="margin-bottom:16px">Благодарю</h3>
        <p class="subd" style="margin:0 auto 28px">Скоро мы с вами свяжемся и пригласим на приём!</p>
        <div class="sb">
          <a href="${SITE_URL}" class="bp" id="anketaGoSite">Перейти на сайт</a>
        </div>
      `;
      host.appendChild(panel);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    };

    const doSubmit = async () => {
      if (submitLocked) return;

      const errors = validate();
      if (errors.length) {
        window.alert(`Заполните обязательные поля (*):\n\n— ${errors.join("\n— ")}`);
        return;
      }
      if (submitBtn?.getAttribute("aria-disabled") === "true") return;

      const text = buildText();
      if (hiddenText) hiddenText.value = text;

      const honeypot =
        (form.querySelector('[name="company_website"]') as HTMLInputElement | null)
          ?.value?.trim() || "";

      submitLocked = true;
      setSubmitBusy(true);
      if (submitMsg) {
        submitMsg.className = "sm vs inf";
        submitMsg.style.cssText = "";
        submitMsg.textContent = "Отправляю анкету…";
      }
      copyMsg?.classList.remove("vs");
      persist();

      try {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            version: 1,
            submittedAt: new Date().toISOString(),
            company_website: honeypot,
            consent: true,
            name: value("name"),
            phone: value("phone"),
            email: value("email"),
            city: value("city"),
            format: groupRadio("format"),
            request: value("request"),
            contactMethods: groupChecked("msg"),
            zones: zones.size ? Array.from(zones).join(", ") : "не отмечено",
            whenStart: groupRadio("wn"),
            commitment: value("cm") ? `${value("cm")}/10` : "",
            summary: text,
          }),
        });

        const data = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string; delivered?: boolean }
          | null;

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "delivery_failed");
        }

        clearDraft();
        showSuccessScreen();
      } catch {
        showError(
          "Не удалось отправить. Данные сохранены на этом устройстве — нажмите «Повторить отправку»."
        );
        submitLocked = false;
        setSubmitBusy(false);
      }
    };

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

    const onSubmit = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      void doSubmit();
    };

    copyBtn?.addEventListener("click", onCopy);
    submitBtn?.addEventListener("click", onSubmit);
    cleanups.push(() => {
      copyBtn?.removeEventListener("click", onCopy);
      submitBtn?.removeEventListener("click", onSubmit);
      if (saveTimer) clearTimeout(saveTimer);
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}
