(function(){
  "use strict";

  /* ==========================================================
     НАСТРОЙКИ — МЕНЯТЬ ЗДЕСЬ
     ========================================================== */

  // Адрес страницы с анкетой. Пример: "https://egoshev.ru/kids-anketa"
  var ANKETA_URL = "/kids-anketa";

  // Цены и параметры форматов — единственное место, где они заданы
  var PROGRAMS = {
    weekday: {
      name: "Атмосфера 3D Kids · Будни",
      price: "15 000 ₽",
      duration: "1,5–2 часа",
      groupSize: "до 4 детей",
      mCta: "Записаться · будни",
      mShort: "Будни"
    },
    weekend: {
      name: "Атмосфера 3D Kids · Выходные",
      price: "17 000 ₽",
      duration: "4–5 часов",
      groupSize: "до 4 детей",
      mCta: "Заявка · выходные",
      mShort: "Выходные"
    }
  };

  /* ========================================================== */

  var root = document.getElementById("a3d-kids");
  if (!root) return;

  /* Техподписи слотов — только локально (или ?hints=1) */
  (function hidePhotoHints(){
    var forced = new URLSearchParams(window.location.search).get("hints");
    var local = forced === "1" || ((forced !== "0") && /^(localhost|127\.0\.0\.1)$/.test(location.hostname));
    if (local) return;
    root.querySelectorAll(".k-photo-hint").forEach(function(el){ el.remove(); });
  })();
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = "weekday";

  /* ---------- Подстановка цен и параметров ---------- */
  function inject(){
    root.querySelectorAll("[data-price]").forEach(function(el){
      var p = PROGRAMS[el.getAttribute("data-price")]; if(p) el.textContent = p.price;
    });
    root.querySelectorAll("[data-duration]").forEach(function(el){
      var p = PROGRAMS[el.getAttribute("data-duration")]; if(p) el.textContent = p.duration;
    });
    root.querySelectorAll("[data-group]").forEach(function(el){
      var p = PROGRAMS[el.getAttribute("data-group")]; if(p) el.textContent = p.groupSize;
    });
  }

  /* ---------- Ссылка на анкету ---------- */
  function anketaUrl(fmt){
    if(!ANKETA_URL || ANKETA_URL.indexOf("ВСТАВИТЬ") !== -1) return null;
    try{
      var u = new URL(ANKETA_URL, window.location.href);
      u.searchParams.set("format", fmt || "general");
      return u.toString();
    }catch(e){ return ANKETA_URL; }
  }

  /* ---------- Аналитика ---------- */
  function track(ev, params){
    try{
      if(typeof window.ym === "function" && window.YM_COUNTER_ID){
        window.ym(window.YM_COUNTER_ID, "reachGoal", ev, params || {});
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({event: ev}, params || {}));
    }catch(e){}
  }

  /* ---------- Переключатель форматов ---------- */
  function setFormat(fmt){
    if(!PROGRAMS[fmt]) return;
    current = fmt;
    root.querySelectorAll(".k-tab[data-format]").forEach(function(t){
      var on = t.getAttribute("data-format") === fmt;
      t.classList.toggle("k-on", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    root.querySelectorAll("[data-card]").forEach(function(c){
      c.classList.toggle("k-sel", c.getAttribute("data-card") === fmt);
    });
    root.querySelectorAll(".k-rp").forEach(function(r){
      r.classList.toggle("k-on", r.getAttribute("data-route") === fmt);
    });
    updateMcta();
    track("program_format_selected", {value: fmt});
  }

  root.querySelectorAll(".k-tab[data-format]").forEach(function(t){
    t.addEventListener("click", function(){ setFormat(t.getAttribute("data-format")); });
  });

  /* ---------- Кнопки анкеты ---------- */
  root.addEventListener("click", function(e){
    var btn = e.target.closest(".k-apply");
    if(!btn) return;
    var fmt = btn.getAttribute("data-format") || "general";
    track("application_clicked", {program_type: fmt});
    var url = anketaUrl(fmt);
    if(url){ window.open(url, "_blank", "noopener"); }
    else { openModal(); }
  });

  /* ---------- Модалка ---------- */
  var modal = document.getElementById("kModal");
  function openModal(){ if(modal){ modal.classList.add("k-on"); modal.setAttribute("aria-hidden","false"); } }
  function closeModal(){ if(modal){ modal.classList.remove("k-on"); modal.setAttribute("aria-hidden","true"); } }
  if(modal){
    modal.querySelectorAll("[data-close]").forEach(function(el){ el.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeModal(); });
  }

  /* ---------- Возрастные группы ---------- */
  var AGES = {
    "7-9": {
      lead: "Больше двигательных игр, исследования пространства, простых командных задач, изучения возможностей тела и коротких разговоров.",
      tags: ["дружба","правила","уважение","попросить о помощи","отношение к ошибкам","внимание к другим","смелость пробовать"]
    },
    "10-12": {
      lead: "Больше командных заданий, координации, самостоятельных решений и содержательных обсуждений.",
      tags: ["ответственность","дружба и конфликты","уверенность","дисциплина","отношение к поражению","умение договариваться","уважение к себе"]
    },
    "13-15": {
      lead: "Больше осознанной физической подготовки, задач на взаимодействие, выбора стратегии и разговора о взрослении.",
      tags: ["самостоятельность","ответственность за выбор","дисциплина","отношение к страху","личные границы","уважение","лидерство без давления","ошибки и последствия","внутренняя опора"]
    }
  };
  var agePanel = document.getElementById("kAgePanel");
  function renderAge(age){
    var d = AGES[age]; if(!d || !agePanel) return;
    agePanel.innerHTML =
      '<p class="k-agelead">' + d.lead + '</p>' +
      '<p class="k-agelabel">Темы разговоров</p>' +
      '<div class="k-tags">' + d.tags.map(function(t){ return "<span>"+t+"</span>"; }).join("") + '</div>';
  }
  root.querySelectorAll(".k-agetab").forEach(function(t){
    t.addEventListener("click", function(){
      root.querySelectorAll(".k-agetab").forEach(function(x){
        var on = x === t;
        x.classList.toggle("k-on", on);
        x.setAttribute("aria-selected", on ? "true" : "false");
      });
      renderAge(t.getAttribute("data-age"));
    });
  });

  /* ---------- Таймлайн ---------- */
  root.querySelectorAll(".k-tlh").forEach(function(h){
    h.addEventListener("click", function(){
      var li = h.closest(".k-tli");
      var open = li.classList.toggle("k-open");
      h.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- FAQ: по одному открытому ---------- */
  var faqs = root.querySelectorAll(".k-faq details");
  faqs.forEach(function(d){
    d.addEventListener("toggle", function(){
      if(d.open){
        track("faq_opened", {});
        faqs.forEach(function(o){ if(o !== d) o.open = false; });
      }
    });
  });

  /* ---------- Мобильная кнопка ---------- */
  var mcta = document.getElementById("kMcta");
  var mctaBtn = document.getElementById("kMctaBtn");
  function updateMcta(){
    if(!mctaBtn) return;
    var p = PROGRAMS[current]; if(!p) return;
    mctaBtn.setAttribute("data-format", current);
    var narrow = window.matchMedia("(max-width: 359px)").matches;
    mctaBtn.textContent = (narrow ? p.mShort : p.mCta) + " · " + p.price;
  }
  window.addEventListener("resize", updateMcta);

  var hero = root.querySelector(".k-hero");
  if(mcta && hero && "IntersectionObserver" in window){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        mcta.classList.toggle("k-on", !en.isIntersecting);
        mcta.setAttribute("aria-hidden", en.isIntersecting ? "true" : "false");
      });
    }, {threshold: 0.08}).observe(hero);
  }

  /* ---------- Появление блоков ---------- */
  var revs = root.querySelectorAll(".k-rev");
  if(reduce || !("IntersectionObserver" in window)){
    revs.forEach(function(el){ el.classList.add("k-vis"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add("k-vis"); io.unobserve(en.target); }
      });
    }, {threshold: 0.1, rootMargin: "0px 0px -6% 0px"});
    revs.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Плавная прокрутка по якорям ---------- */
  root.querySelectorAll('a[href^="#k-"]').forEach(function(a){
    a.addEventListener("click", function(e){
      var t = document.querySelector(a.getAttribute("href"));
      if(!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.pageYOffset - 16;
      try{ window.scrollTo({top:y, behavior: reduce ? "auto" : "smooth"}); }
      catch(err){ window.scrollTo(0,y); }
    });
  });

  /* ---------- Просмотр блока цен ---------- */
  var price = document.getElementById("k-price");
  if(price && "IntersectionObserver" in window){
    var pio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ track("price_section_viewed", {}); pio.unobserve(en.target); }
      });
    }, {threshold: 0.25});
    pio.observe(price);
  }

  /* ---------- Счётчик «до 4» ---------- */
  var cnt = document.getElementById("kCount");
  if(cnt && !reduce && "IntersectionObserver" in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        cio.unobserve(cnt);
        var n = 1; cnt.textContent = "до " + n;
        var t = setInterval(function(){
          n++; cnt.textContent = "до " + n;
          if(n >= 4) clearInterval(t);
        }, 150);
      });
    }, {threshold: 0.5});
    cio.observe(cnt);
  }

  /* ---------- Год ---------- */
  var y = document.getElementById("kYear");
  if(y) y.textContent = new Date().getFullYear();

  inject();
  renderAge("7-9");
  setFormat("weekday");
})();
