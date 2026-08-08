/** Client runtime ported from master-client-intake.html (parity + production submit). */

export type AnketaplanAnswers = Record<string, string | string[]>;

const LS_KEY = "egoshev_master_intake_v3";
const SUBMIT_ENDPOINT = "/api/anketaplan/submit";

function asList(value: string | string[] | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

type MountApi = {
  destroy: () => void;
};

function q<T extends Element>(root: ParentNode, sel: string): T | null {
  return root.querySelector(sel) as T | null;
}

function qq<T extends Element>(root: ParentNode, sel: string): T[] {
  return [...root.querySelectorAll(sel)] as T[];
}

export function mountAnketaplan(root: HTMLElement): MountApi {
  const form = q<HTMLFormElement>(root, "#masterForm");
  if (!form) {
    return { destroy: () => undefined };
  }

  // Honeypot — hidden from UI, mirrored in strategy lead
  if (!form.querySelector('[name="company_website"]')) {
    const hp = document.createElement("input");
    hp.type = "text";
    hp.name = "company_website";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    hp.style.cssText =
      "position:absolute;left:-9999px;opacity:0;height:0;width:0;overflow:hidden";
    form.prepend(hp);
  }

  const chapters = qq<HTMLElement>(form, ".chapter");
  const title = q<HTMLElement>(root, "#chapterTitle");
  const bar = q<HTMLElement>(root, "#progressBar");
  const saveState = q<HTMLElement>(root, "#saveState");
  const prev = q<HTMLButtonElement>(root, "#prevBtn");
  const next = q<HTMLButtonElement>(root, "#nextBtn");
  const sendDialog = q<HTMLDialogElement>(root, "#sendDialog");
  const actionState = q<HTMLElement>(root, "#actionState");

  let current = 0;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let submitLocked = false;

  qq<HTMLElement>(root, "[data-scale]").forEach((box) => {
    if (box.querySelector("input")) return;
    const scaleName = box.dataset.scale || "";
    for (let i = 0; i <= 10; i++) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="${scaleName}" value="${i}"><span>${i}</span>`;
      box.append(label);
    }
  });

  function show(i: number) {
    current = Math.max(0, Math.min(chapters.length - 1, i));
    chapters.forEach((c, n) => c.classList.toggle("active", n === current));
    if (title) {
      title.textContent = `Глава ${current + 1} · ${chapters[current].dataset.title || ""}`;
    }
    if (bar) {
      bar.style.width = `${((current + 1) / chapters.length) * 100}%`;
    }
    if (prev) prev.disabled = current === 0;
    if (next) next.style.display = current === chapters.length - 1 ? "none" : "";
    const sticky = q<HTMLElement>(root, ".sticky");
    if (sticky) {
      window.scrollTo({ top: sticky.offsetTop, behavior: "smooth" });
    }
    history.replaceState(null, "", `#chapter-${current + 1}`);
  }

  function branches() {
    const active = new Set<string>();
    qq<HTMLInputElement>(form!, "[data-branch]:checked").forEach((x) => {
      if (x.dataset.branch) active.add(x.dataset.branch);
    });
    const sex = q<HTMLSelectElement>(root, "#sex")?.value;
    if (sex) active.add(`sex:${sex}`);
    qq<HTMLElement>(root, "[data-show]").forEach((el) => {
      el.classList.toggle("show", active.has(el.dataset.show || ""));
    });
  }

  function ageFromBirth(value: string): number | null {
    if (!value) return null;
    const born = new Date(`${value}T00:00:00`);
    const today = new Date();
    let age = today.getFullYear() - born.getFullYear();
    if (today < new Date(today.getFullYear(), born.getMonth(), born.getDate())) age--;
    return age >= 0 ? age : null;
  }

  function calculateBody() {
    const height = Number(q<HTMLInputElement>(root, "#height")?.value);
    const weight = Number(q<HTMLInputElement>(root, "#weight")?.value);
    const age = ageFromBirth(q<HTMLInputElement>(root, "#birth")?.value || "");
    const sex = q<HTMLSelectElement>(root, "#sex")?.value || "";
    const factor = Number(q<HTMLSelectElement>(root, "#activityFactor")?.value);
    const box = q<HTMLElement>(root, "#bodyCalc");
    if (!box) return;
    if (!height || !weight) {
      box.classList.remove("show");
      return;
    }
    box.classList.add("show");
    const bmi = weight / (height / 100) ** 2;
    const setText = (sel: string, text: string) => {
      const el = q<HTMLElement>(root, sel);
      if (el) el.textContent = text;
    };
    const setVal = (sel: string, text: string) => {
      const el = q<HTMLInputElement>(root, sel);
      if (el) el.value = text;
    };
    setText("#bmiResult", bmi.toFixed(1));
    setVal("#bmiValue", bmi.toFixed(1));
    setText("#ageResult", age != null ? String(age) : "—");
    setVal("#ageValue", age != null ? String(age) : "");
    if (age !== null && age < 18) {
      setText("#bmrResult", "отдельно");
      setText("#tdeeResult", "отдельно");
      setVal("#bmrValue", "");
      setVal("#tdeeValue", "");
      setText(
        "#calcNote",
        "Для ребёнка потребность в энергии рассчитывается отдельно с учётом возраста и развития.",
      );
      return;
    }
    if (age !== null && (sex === "Мужской" || sex === "Женский")) {
      const bmr = Math.round(
        10 * weight + 6.25 * height - 5 * age + (sex === "Мужской" ? 5 : -161),
      );
      setText("#bmrResult", String(bmr));
      setVal("#bmrValue", `${bmr} ккал/день`);
      if (factor) {
        const tdee = bmr * factor;
        const low = Math.round((tdee * 0.95) / 50) * 50;
        const high = Math.round((tdee * 1.05) / 50) * 50;
        setText("#tdeeResult", `${low}–${high}`);
        setVal("#tdeeValue", `примерно ${low}–${high} ккал/день`);
        setText(
          "#calcNote",
          "Это ориентир для поддержания текущего веса. Итоговый план будет учитывать цель, фактическое питание, тренировки и динамику веса.",
        );
      } else {
        setText("#tdeeResult", "—");
        setVal("#tdeeValue", "");
        setText(
          "#calcNote",
          "Выбери уровень активности, чтобы появился ориентир калорий для поддержания веса.",
        );
      }
    } else {
      setText("#bmrResult", "—");
      setText("#tdeeResult", "—");
      setText(
        "#calcNote",
        "Для расчёта энергии укажи дату рождения и выбери мужской или женский пол.",
      );
    }
  }

  function updatePainCards() {
    const holder = q<HTMLElement>(root, "#painDetails");
    if (!holder) return;
    const selected = qq<HTMLInputElement>(root, "#painZones input:checked")
      .map((x) => x.value)
      .filter((x) => x !== "Боли нет");
    const old: Record<string, string> = {};
    qq<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      holder,
      "[name]",
    ).forEach((x) => {
      old[x.name] = x.value;
    });
    holder.innerHTML = "";
    selected.forEach((zone) => {
      const safe = zone.replaceAll('"', "&quot;");
      const card = document.createElement("div");
      card.className = "pain-card";
      card.innerHTML = `<h4>${safe}</h4><div class="grid2"><div class="field"><label class="label">С какой стороны?</label><select class="control" name="Боль: ${safe}: сторона"><option value="">Выбери</option><option>Слева</option><option>Справа</option><option>С обеих сторон</option><option>По центру</option></select></div><div class="field"><label class="label">Максимальная боль за 7 дней</label><select class="control" name="Боль: ${safe}: интенсивность 0-10"><option value="">Выбери от 0 до 10</option>${Array.from({ length: 11 }, (_, i) => `<option>${i}</option>`).join("")}</select></div></div><div class="field"><label class="label">Как ощущается и когда возникает?</label><textarea class="control" name="Боль: ${safe}: описание" placeholder="Тянет, ноет, колет, жжёт, немеет или отдаёт в другую зону; когда началось; что усиливает и что облегчает"></textarea></div>`;
      holder.append(card);
    });
    qq<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      holder,
      "[name]",
    ).forEach((x) => {
      if (old[x.name] !== undefined) x.value = old[x.name];
    });
  }

  function handlePainChoice(event: Event) {
    const target = event.target as HTMLElement | null;
    if (!target?.matches?.("#painZones input")) return;
    const all = qq<HTMLInputElement>(root, "#painZones input");
    const none = all.find((x) => x.value === "Боли нет");
    const input = target as HTMLInputElement;
    if (none && input === none && none.checked) {
      all.filter((x) => x !== none).forEach((x) => {
        x.checked = false;
      });
    } else if (input.checked && none) {
      none.checked = false;
    }
    updatePainCards();
  }

  function serialize(): AnketaplanAnswers {
    const out: AnketaplanAnswers = {};
    new FormData(form!).forEach((v, k) => {
      if (k === "company_website") return;
      const value = String(v).trim();
      if (!value) return;
      if (out[k]) out[k] = [...asList(out[k]), value];
      else out[k] = value;
    });
    qq<HTMLElement>(form!, "[data-group]").forEach((g) => {
      const key = g.dataset.group;
      if (!key) return;
      const vals = qq<HTMLInputElement>(g, "input:checked").map((x) => x.value);
      if (vals.length) out[key] = vals;
    });
    return out;
  }

  function persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(serialize()));
      if (saveState) {
        saveState.textContent =
          "Сохранено · " +
          new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      }
    } catch {
      if (saveState) saveState.textContent = "Не удалось сохранить";
    }
  }

  function restore() {
    if (typeof window === "undefined") return;
    try {
      const d = JSON.parse(localStorage.getItem(LS_KEY) || "{}") as AnketaplanAnswers;
      Object.entries(d).forEach(([k, v]) => {
        const vals = asList(v);
        const nodes = qq<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          form!,
          `[name="${CSS.escape(k)}"]`,
        );
        nodes.forEach((n) => {
          if (n instanceof HTMLInputElement && (n.type === "checkbox" || n.type === "radio")) {
            n.checked = vals.includes(n.value);
          } else {
            n.value = vals[0] || "";
          }
        });
        const group = q<HTMLElement>(form!, `[data-group="${CSS.escape(k)}"]`);
        if (group) {
          qq<HTMLInputElement>(group, "input").forEach((n) => {
            n.checked = vals.includes(n.value);
          });
        }
      });
    } catch {
      /* ignore corrupt LS */
    }
  }

  function validateChapter(): boolean {
    const required = qq<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      chapters[current],
      "[required]",
    ).filter((x) => (x as HTMLElement).offsetParent !== null);
    for (const el of required) {
      if (!el.checkValidity()) {
        el.focus();
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  function build(): string {
    const d = serialize();
    const riskKeys = [
      "Самочувствие при нагрузке",
      "Диагнозы и ограничения",
      "Обычное давление",
      "Максимальное давление",
      "Лекарства",
      "Аллергии",
      "Зоны боли",
    ];
    let text = "ПАСПОРТ КЛИЕНТА · ПЕРСОНАЛЬНАЯ СТРАТЕГИЯ ТЕЛА\n";
    text += `Сформирован: ${new Date().toLocaleString("ru-RU")}\n\n`;
    const risks = riskKeys
      .filter((k) => d[k])
      .map((k) => `${k}: ${asList(d[k]).join(", ")}`);
    if (risks.length) text += "ЗДОРОВЬЕ И САМОЧУВСТВИЕ\n" + risks.join("\n") + "\n\n";

    const groups: [string, string[]][] = [
      [
        "1. КЛИЕНТ И ЦЕЛИ",
        [
          "Имя и фамилия",
          "Дата рождения",
          "Пол",
          "Рост, см",
          "Вес, кг",
          "Город и часовой пояс",
          "Контакт",
          "Работа",
          "Для кого план",
          "Запросы",
          "Почему сейчас",
          "Один приоритет на 30 дней",
          "Цель 30 дней",
          "Цель 3 месяца",
          "Цель год",
          "Смысл результата",
        ],
      ],
      [
        "2. ЗДОРОВЬЕ",
        [
          "Диагностированные состояния",
          "Диагнозы и ограничения",
          "Обследования и анализы",
          "Контроль давления",
          "Пульс в покое",
          "Добавки",
        ],
      ],
      [
        "3. ИСТОРИЯ ТЕЛА",
        [
          "Травмы",
          "Операции и реабилитация",
          "Предыдущая помощь",
          "Боль 0-10",
          "Влияние боли",
          "Сложные движения",
          "Избегаемые движения",
        ],
      ],
      [
        "4. ДВИЖЕНИЕ",
        [
          "Двигательная биография",
          "Опыт направлений",
          "Отношение к направлениям",
          "Силовой опыт",
          "Шаги в день",
          "Тренировок в неделю",
          "Сидение часов",
          "Текущая активность",
          "Ответ на нагрузку",
          "Самооценка мобильности 0-10",
          "Самооценка координации 0-10",
          "Самооценка баланса 0-10",
          "Чувство тела 0-10",
          "Ограничения движения",
        ],
      ],
      [
        "5. ДЫХАНИЕ И СОН",
        [
          "Особенности дыхания",
          "Дыхание подробно",
          "Время отбоя",
          "Время подъёма",
          "Продолжительность сна",
          "Сон: особенности",
          "Восстановление сном 0-10",
          "Циркадные привычки",
        ],
      ],
      [
        "6. ПИТАНИЕ",
        [
          "Рацион буднего дня",
          "Рацион выходного дня",
          "Вода",
          "Кофеин",
          "Алкоголь",
          "Пищевые ограничения",
          "Пищевое поведение",
          "История диет",
        ],
      ],
      [
        "7. ПСИХОЛОГИЯ И ИЗМЕНЕНИЯ",
        [
          "Психология: энергия 0-10",
          "Психология: настроение 0-10",
          "Психология: стресс 0-10",
          "Психология: контроль 0-10",
          "Источники стресса",
          "Психологические ресурсы",
          "Психологическая помощь",
          "Важность изменений 0-10",
          "Уверенность в изменениях 0-10",
          "Барьеры",
          "Причины прошлых срывов",
          "Нужная поддержка",
        ],
      ],
      [
        "8. ВОССТАНОВЛЕНИЕ",
        [
          "Практики восстановления",
          "Восстановление между нагрузками 0-10",
          "Признаки перегруза",
          "Природные практики",
          "Опыт закаливания",
        ],
      ],
      [
        "9. БИОМЕТРИКА И ОСОБЫЙ КОНТЕКСТ",
        [
          "Устройства",
          "Биометрика",
          "Отношение к метрикам",
          "Женское здоровье: цикл",
          "Женское здоровье: контекст",
          "Соревнования",
          "Спорт: соревнования",
          "Спорт: нагрузка",
          "Спорт: лимитирующие факторы",
        ],
      ],
      [
        "10. УСЛОВИЯ ПЛАНА",
        [
          "Дней на тренировки",
          "Минут на тренировку",
          "Расписание",
          "Минимальная версия плана",
          "Места тренировок",
          "Инвентарь",
          "Готов приобрести",
          "Предпочтительный формат",
          "Коммуникация и обратная связь",
        ],
      ],
      [
        "11. МАТЕРИАЛЫ И ФИНАЛ",
        [
          "Готовность материалов",
          "Ссылка на фото и видео",
          "Комментарий к материалам",
          "Дополнительная информация",
          "Три главных факта",
        ],
      ],
    ];

    groups[0][1].splice(
      5,
      0,
      "Талия, см",
      "Бёдра, см",
      "Грудь, см",
      "Уровень повседневной активности",
      "Расчёт: возраст",
      "Расчёт: ИМТ",
      "Расчёт: основной обмен",
      "Расчёт: поддержание калорий",
    );
    groups[1][1].push(
      "Семейная история здоровья",
      "Самочувствие при нагрузке",
      "Лекарства",
      "Аллергии",
      "Никотин",
      "Частота простуд",
    );
    groups[5][1].push(
      "Источник питьевой воды",
      "Пищеварение",
      "Пищеварение подробно",
      "Кожа волосы ногти",
    );
    groups[8][1].push("Мужское здоровье: особенности", "Мужское здоровье: подробно");
    const painKeys = Object.keys(d).filter((k) => k.startsWith("Боль: "));
    groups[2][1].splice(3, 0, ...painKeys);

    groups.forEach(([head, keys]) => {
      const lines = keys
        .filter((k) => d[k])
        .map((k) => `${k}: ${asList(d[k]).join(", ")}`);
      if (lines.length) text += head + "\n" + lines.join("\n") + "\n\n";
    });

    const summary = q<HTMLElement>(root, "#summary");
    const trimmed = text.trim();
    if (summary) summary.textContent = trimmed;
    return trimmed;
  }

  function setActionState(message: string, kind?: "success" | "error" | "sending") {
    if (!actionState) return;
    actionState.textContent = message;
    actionState.classList.remove("success", "error");
    if (kind === "success") actionState.classList.add("success");
    if (kind === "error") actionState.classList.add("error");
  }

  function showInPlaceSuccess() {
    const summarySection = q<HTMLElement>(root, "#summary")?.closest(".section");
    if (!summarySection) return;
    let banner = q<HTMLElement>(root, "#anketaplanSuccess");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "anketaplanSuccess";
      banner.className = "notice";
      banner.innerHTML =
        "<strong>Анкета отправлена.</strong> Паспорт сохранён на этом устройстве. Я получу сводку и файл — можно закрыть страницу.";
      summarySection.prepend(banner);
    }
    banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function submitPassport() {
    if (submitLocked) return;
    if (!validateChapter()) return;

    const consent = q<HTMLInputElement>(
      form!,
      'input[name="Согласие на обработку"]',
    );
    if (!consent?.checked) {
      consent?.focus();
      consent?.reportValidity();
      setActionState("Нужно согласие на обработку ответов.", "error");
      return;
    }

    const sendBtn = q<HTMLButtonElement>(root, "#sendBtn");
    submitLocked = true;
    if (sendBtn) sendBtn.disabled = true;
    setActionState("Отправляю…", "sending");

    const answers = serialize();
    const summary = build();
    const honeypot =
      q<HTMLInputElement>(form!, '[name="company_website"]')?.value?.trim() || "";

    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: 3,
          submittedAt: new Date().toISOString(),
          company_website: honeypot,
          consent: true,
          answers,
          summary,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; delivered?: boolean }
        | null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "delivery_failed");
      }

      persist();
      setActionState(
        data.delivered === false
          ? "Анкета принята (локально). Доставка в Telegram на сервере не настроена — ответы сохранены."
          : "Анкета безопасно отправлена.",
        "success",
      );
      showInPlaceSuccess();
    } catch {
      setActionState(
        "Не удалось отправить. Ответы сохранены на устройстве — нажми ещё раз или скачай .txt.",
        "error",
      );
    } finally {
      submitLocked = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  }

  const onInput = () => {
    branches();
    calculateBody();
    if (saveState) saveState.textContent = "Сохраняю…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 350);
  };
  const onChange = (event: Event) => {
    handlePainChoice(event);
    branches();
    calculateBody();
  };
  const onNext = () => {
    if (validateChapter()) show(current + 1);
  };
  const onPrev = () => show(current - 1);
  const onBuild = () => {
    build();
  };
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(build());
      setActionState("Скопировано в буфер обмена.");
    } catch {
      setActionState("Копирование недоступно — выдели текст вручную.");
    }
  };
  const onDownload = () => {
    const blob = new Blob([build()], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `client-passport-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const onShare = async () => {
    const text = build();
    if (navigator.share) {
      try {
        await navigator.share({ title: "Паспорт клиента", text });
      } catch {
        /* user cancel */
      }
    } else {
      setActionState("Системное меню недоступно — используй «Скопировать».");
    }
  };
  const onSend = () => {
    void submitPassport();
  };
  const onDialogClose = (event: Event) => {
    const t = event.target as HTMLElement | null;
    if (t?.closest?.("[data-close-dialog]")) {
      sendDialog?.close();
    }
  };

  form.addEventListener("input", onInput);
  form.addEventListener("change", onChange);
  prev?.addEventListener("click", onPrev);
  next?.addEventListener("click", onNext);
  q<HTMLButtonElement>(root, "#buildSummary")?.addEventListener("click", onBuild);
  q<HTMLButtonElement>(root, "#copyBtn")?.addEventListener("click", onCopy);
  q<HTMLButtonElement>(root, "#downloadBtn")?.addEventListener("click", onDownload);
  q<HTMLButtonElement>(root, "#shareBtn")?.addEventListener("click", onShare);
  q<HTMLButtonElement>(root, "#sendBtn")?.addEventListener("click", onSend);
  root.addEventListener("click", onDialogClose);

  restore();
  updatePainCards();
  restore();
  branches();
  calculateBody();
  const fromHash = Number(location.hash.replace("#chapter-", "")) - 1;
  show(Number.isFinite(fromHash) && fromHash >= 0 ? fromHash : 0);

  return {
    destroy: () => {
      clearTimeout(saveTimer);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      q<HTMLButtonElement>(root, "#buildSummary")?.removeEventListener("click", onBuild);
      q<HTMLButtonElement>(root, "#copyBtn")?.removeEventListener("click", onCopy);
      q<HTMLButtonElement>(root, "#downloadBtn")?.removeEventListener("click", onDownload);
      q<HTMLButtonElement>(root, "#shareBtn")?.removeEventListener("click", onShare);
      q<HTMLButtonElement>(root, "#sendBtn")?.removeEventListener("click", onSend);
      root.removeEventListener("click", onDialogClose);
    },
  };
}
