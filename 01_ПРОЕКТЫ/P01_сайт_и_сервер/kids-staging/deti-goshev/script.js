/* =========================================================
   ДЕТСКИЕ ПРОГРАММЫ ЕВГЕНИЯ ГОШЕВА
   Логика страницы: два формата, единый источник цен, интерактив
   ========================================================= */

/* ---------- 1. ССЫЛКИ (заменить перед публикацией) ---------- */
const APPLICATION_URL = "ВСТАВИТЬ_ССЫЛКУ_НА_АНКЕТУ";
const ABOUT_URL = "ВСТАВИТЬ_ССЫЛКУ_НА_СТРАНИЦУ_ОБО_МНЕ";

/* ---------- 2. ПРОГРАММЫ И ЦЕНЫ (единый источник правды) ----------
   Чтобы изменить цену — правьте ТОЛЬКО этот объект.
   Например, цену выходного дня: weekend.price = "20 000 ₽".            */
const PROGRAMS = {
  weekday: {
    name: "Лаборатория движения",
    price: "15 000 ₽",
    duration: "1,5–2 часа",
    groupSize: "до 4 детей",
    format: "Будничное занятие",
    mobileCta: "Записаться на занятие",
    mobileShort: "Будни"
  },
  weekend: {
    name: "День движения и характера",
    price: "17 000 ₽",
    duration: "4–5 часов",
    groupSize: "до 4 детей",
    format: "Программа выходного дня",
    mobileCta: "Программа выходного дня",
    mobileShort: "Выходные"
  }
};

/* ---------- 3. ФОРМИРОВАНИЕ ССЫЛКИ НА АНКЕТУ ---------- */
function getApplicationUrl(programType) {
  if (!APPLICATION_URL || APPLICATION_URL.includes("ВСТАВИТЬ_ССЫЛКУ")) {
    return null;
  }
  try {
    const url = new URL(APPLICATION_URL, window.location.href);
    url.searchParams.set("format", programType || "general");
    return url.toString();
  } catch (e) {
    return APPLICATION_URL; // если анкета не поддерживает параметры — открываем как есть
  }
}

function getAboutUrl() {
  if (!ABOUT_URL || ABOUT_URL.includes("ВСТАВИТЬ_ССЫЛКУ")) return null;
  return ABOUT_URL;
}

/* ---------- 4. АНАЛИТИКА (безопасные заглушки) ---------- */
function track(event, params) {
  try {
    if (typeof window.ym === "function" && window.YM_COUNTER_ID) {
      window.ym(window.YM_COUNTER_ID, "reachGoal", event, params || {});
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, params || {}));
  } catch (e) { /* аналитика не должна ломать страницу */ }
}

/* =========================================================
   ИНИЦИАЛИЗАЦИЯ
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  injectProgramData();
  initFormatSwitcher();
  initApplyButtons();
  initAboutButton();
  initAges();
  initTimeline();
  initFaq();
  initMobileMenu();
  initTopbar();
  initProgressBar();
  initReveal(reduceMotion);
  initModal();
  initMobileCta();
  initSectionEvents();
  initCounter(reduceMotion);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------- Инъекция цен / длительности / размера группы ---------- */
function injectProgramData() {
  document.querySelectorAll("[data-price]").forEach(function (el) {
    const p = PROGRAMS[el.dataset.price];
    if (p) el.textContent = p.price;
  });
  document.querySelectorAll("[data-duration]").forEach(function (el) {
    const p = PROGRAMS[el.dataset.duration];
    if (p) el.textContent = p.duration;
  });
  document.querySelectorAll("[data-groupsize]").forEach(function (el) {
    const p = PROGRAMS[el.dataset.groupsize];
    if (p) el.textContent = p.groupSize;
  });
}

/* =========================================================
   ПЕРЕКЛЮЧАТЕЛЬ ФОРМАТОВ (будни / выходные)
   ========================================================= */
let currentFormat = "weekday";

function initFormatSwitcher() {
  const tabs = Array.prototype.slice.call(document.querySelectorAll(".fmt-tab"));
  const cards = Array.prototype.slice.call(document.querySelectorAll("[data-format-card]"));
  const routes = Array.prototype.slice.call(document.querySelectorAll(".route__panel"));

  function apply(format, updateHash) {
    if (!PROGRAMS[format]) return;
    currentFormat = format;

    tabs.forEach(function (t) {
      const on = t.dataset.format === format;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    cards.forEach(function (c) {
      c.classList.toggle("is-selected", c.dataset.formatCard === format);
    });
    routes.forEach(function (r) {
      r.classList.toggle("is-active", r.dataset.route === format);
    });

    updateMobileCta();
    if (updateHash) {
      try { history.replaceState(null, "", "#" + format); } catch (e) {}
    }
    track("program_format_selected", { value: format });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { apply(t.dataset.format, true); });
  });

  // Автовыбор формата из hash (#weekday / #weekend)
  const hash = (window.location.hash || "").replace("#", "");
  if (PROGRAMS[hash]) {
    apply(hash, false);
  } else {
    apply("weekday", false);
  }

  window.addEventListener("hashchange", function () {
    const h = (window.location.hash || "").replace("#", "");
    if (PROGRAMS[h]) apply(h, false);
  });
}

/* =========================================================
   КНОПКИ АНКЕТЫ
   ========================================================= */
function initApplyButtons() {
  document.querySelectorAll(".js-apply").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const programType = btn.dataset.format || "general";
      track("application_clicked", { program_type: programType });

      const url = getApplicationUrl(programType);
      if (url) {
        window.open(url, "_blank", "noopener");
      } else {
        openModal(
          "Анкета скоро откроется",
          "Ссылка на анкету будет добавлена перед публикацией страницы."
        );
      }
    });
  });
}

function initAboutButton() {
  document.querySelectorAll(".js-about").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const url = getAboutUrl();
      if (url) {
        window.open(url, "_blank", "noopener");
      } else {
        openModal(
          "Страница скоро появится",
          "Ссылка на страницу «Обо мне» будет добавлена перед публикацией."
        );
      }
    });
  });
}

/* =========================================================
   ВОЗРАСТНЫЕ ГРУППЫ
   ========================================================= */
const AGE_CONTENT = {
  "7-9": {
    lead: "Больше двигательных игр, исследования пространства, простых командных задач, изучения возможностей тела и коротких разговоров.",
    tags: ["дружба", "правила", "уважение", "умение попросить о помощи", "отношение к ошибкам", "внимание к другим", "смелость пробовать новое"]
  },
  "10-12": {
    lead: "Больше командных заданий, координации, самостоятельных решений и содержательных обсуждений.",
    tags: ["ответственность", "дружба и конфликты", "уверенность", "дисциплина", "отношение к поражению", "умение договариваться", "уважение к себе и окружающим"]
  },
  "13-15": {
    lead: "Больше осознанной физической подготовки, задач на взаимодействие, выбора стратегии и разговора о взрослении.",
    tags: ["самостоятельность", "ответственность за выбор", "дисциплина", "отношение к страху", "личные границы", "уважение", "лидерство без давления", "ошибки и последствия", "отношения со сверстниками", "внутренняя опора"]
  }
};

function initAges() {
  const tabs = Array.prototype.slice.call(document.querySelectorAll(".ages__tab"));
  const panel = document.getElementById("agePanel");
  if (!panel) return;

  function render(age) {
    const data = AGE_CONTENT[age];
    if (!data) return;
    const tags = data.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    panel.innerHTML =
      '<p class="age-block__lead">' + data.lead + "</p>" +
      '<p class="age-block__label">Темы разговоров</p>' +
      '<div class="age-block__tags">' + tags + "</div>";
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) {
        const on = x === t;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-selected", on ? "true" : "false");
      });
      render(t.dataset.age);
    });
  });

  render("7-9");
}

/* =========================================================
   ТАЙМЛАЙН (раскрытие этапов)
   ========================================================= */
function initTimeline() {
  document.querySelectorAll(".timeline__head").forEach(function (head) {
    head.addEventListener("click", function () {
      const item = head.closest(".timeline__item");
      const open = item.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

/* =========================================================
   FAQ (по одному открытому + событие)
   ========================================================= */
function initFaq() {
  const items = Array.prototype.slice.call(document.querySelectorAll(".faq__item"));
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        track("faq_opened", { question: item.querySelector(".faq__q").textContent.trim() });
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
}

/* =========================================================
   МОБИЛЬНОЕ МЕНЮ
   ========================================================= */
function initMobileMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;

  function close() {
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function open() {
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  burger.addEventListener("click", function () {
    menu.classList.contains("is-open") ? close() : open();
  });
  menu.querySelectorAll("a, .mobile-menu__cta").forEach(function (el) {
    el.addEventListener("click", close);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) close();
  });
}

/* =========================================================
   ШАПКА ПРИ ПРОКРУТКЕ
   ========================================================= */
function initTopbar() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  function onScroll() {
    bar.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =========================================================
   ИНДИКАТОР ПРОГРЕССА
   ========================================================= */
function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* =========================================================
   REVEAL-АНИМАЦИИ
   ========================================================= */
function initReveal(reduceMotion) {
  const els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
}

/* =========================================================
   МОДАЛЬНОЕ ОКНО (доступное)
   ========================================================= */
let lastFocused = null;
function initModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}
function openModal(title, text) {
  const modal = document.getElementById("modal");
  if (!modal) return;
  if (title) { const t = document.getElementById("modalTitle"); if (t) t.textContent = title; }
  if (text) { const p = modal.querySelector(".modal__text"); if (p) p.textContent = text; }
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  const closeBtn = modal.querySelector(".modal__close");
  if (closeBtn) closeBtn.focus();
}
function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

/* =========================================================
   ФИКСИРОВАННАЯ МОБИЛЬНАЯ КНОПКА (под выбранный формат)
   ========================================================= */
function updateMobileCta() {
  const btn = document.getElementById("mobileCtaBtn");
  const p = PROGRAMS[currentFormat];
  if (!btn || !p) return;
  btn.dataset.format = currentFormat;
  const narrow = window.matchMedia("(max-width: 359px)").matches;
  const label = narrow ? p.mobileShort : p.mobileCta;
  btn.textContent = label + " · " + p.price;
}

function initMobileCta() {
  const wrap = document.getElementById("mobileCta");
  const hero = document.getElementById("hero");
  if (!wrap || !hero) return;

  updateMobileCta();
  window.addEventListener("resize", updateMobileCta);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Показываем кнопку, когда первый экран ушёл из зоны видимости
        wrap.classList.toggle("is-visible", !entry.isIntersecting);
        wrap.setAttribute("aria-hidden", entry.isIntersecting ? "true" : "false");
      });
    }, { threshold: 0.1 });
    io.observe(hero);
  } else {
    wrap.classList.add("is-visible");
  }
}

/* =========================================================
   СОБЫТИЯ СЕКЦИЙ (просмотр цен, выбор локации)
   ========================================================= */
function initSectionEvents() {
  const pricing = document.getElementById("pricing");
  if (pricing && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track("price_section_viewed", {});
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(pricing);
  }

  document.querySelectorAll("[data-location]").forEach(function (loc) {
    loc.addEventListener("click", function () {
      track("location_selected", { location: loc.dataset.location });
    });
  });
}

/* =========================================================
   МЯГКИЙ СЧЁТЧИК «до 4»
   ========================================================= */
function initCounter(reduceMotion) {
  const el = document.querySelector(".hero__facts-num[data-count]");
  if (!el) return;
  const target = parseInt(el.dataset.count, 10) || 4;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    el.textContent = "до " + target;
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(el);
      let n = 1;
      el.textContent = "до " + n;
      const timer = setInterval(function () {
        n += 1;
        el.textContent = "до " + n;
        if (n >= target) clearInterval(timer);
      }, 140);
    });
  }, { threshold: 0.5 });
  io.observe(el);
}
