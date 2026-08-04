(function () {
  "use strict";

  /* ============================================================
     НАСТРОЙКИ ОТПРАВКИ — МЕНЯТЬ ЗДЕСЬ
     ============================================================
     SUBMIT_MODE:
       "telegram" — анкета собирается в текст, родитель отправляет
                    вам в Telegram одной кнопкой (работает сразу, без настройки)
       "webhook"  — анкета уходит POST-запросом на ваш адрес
                    (нужен WEBHOOK_URL: Make, n8n, Google-таблица и т.д.)
     ============================================================ */
  var SUBMIT_MODE = "telegram";
  var TELEGRAM_USERNAME = "EGoshev";   // без @
  var WEBHOOK_URL = "";                 // заполняется при SUBMIT_MODE = "webhook"

  var form = document.getElementById("egForm");
  if (!form) return;
  /* Предзаполнение формата из URL (?format=weekday|weekend|general) */
  (function prefillFormat(){
    try {
      var f = new URLSearchParams(window.location.search).get("format");
      if (!f) return;
      var map = {
        weekday: "Атмосфера 3D Kids · Будни",
        weekend: "Атмосфера 3D Kids · Выходные",
        general: "Пока не определились"
      };
      var val = map[f] || null;
      if (!val) return;
      var input = form.querySelector('input[name="format"][value="' + val + '"]');
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } catch (e) {}
  })();


  var steps = Array.prototype.slice.call(form.querySelectorAll(".eg-step"));
  var total = steps.length;
  var current = 0;

  var fill = document.getElementById("egFill");
  var num = document.getElementById("egNum");
  var stepName = document.getElementById("egStepName");
  var done = document.getElementById("egDone");
  var summary = document.getElementById("egSummary");
  var root = document.getElementById("eg-anketa");

  /* ---------- Навигация по шагам ---------- */
  function render() {
    steps.forEach(function (s, i) { s.classList.toggle("eg-on", i === current); });
    var pct = ((current + 1) / total) * 100;
    if (fill) fill.style.width = pct + "%";
    if (num) num.textContent = current + 1;
    if (stepName) stepName.textContent = steps[current].dataset.name || "";
    scrollToTop();
  }

  function scrollToTop() {
    if (!root) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var y = root.getBoundingClientRect().top + window.pageYOffset - 24;
    try { window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" }); }
    catch (e) { window.scrollTo(0, y); }
  }

  /* ---------- Валидация текущего шага ---------- */
  function validateStep(index) {
    var step = steps[index];
    var ok = true;

    // Обычные обязательные поля
    step.querySelectorAll("input[required], select[required], textarea[required]").forEach(function (el) {
      if (el.type === "checkbox" || el.type === "radio") return;
      var bad = !el.value.trim();
      el.classList.toggle("eg-invalid", bad);
      showError(step, el.name, bad);
      if (bad) ok = false;
    });

    // Обязательные группы radio
    step.querySelectorAll("input[type=radio][required]").forEach(function (el) {
      var group = step.querySelectorAll('input[name="' + el.name + '"]');
      var checked = Array.prototype.some.call(group, function (g) { return g.checked; });
      showError(step, el.name, !checked);
      if (!checked) ok = false;
    });

    // Обязательные согласия
    var consents = step.querySelectorAll("input[type=checkbox][required]");
    if (consents.length) {
      var allOk = Array.prototype.every.call(consents, function (c) { return c.checked; });
      showError(step, "consents", !allOk);
      if (!allOk) ok = false;
    }

    if (!ok) {
      var firstErr = step.querySelector(".eg-err.eg-show");
      if (firstErr) firstErr.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    return ok;
  }

  function showError(step, name, show) {
    var err = step.querySelector('.eg-err[data-err="' + name + '"]');
    if (err) err.classList.toggle("eg-show", !!show);
  }

  /* ---------- Кнопки ---------- */
  form.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!validateStep(current)) return;
      if (current < total - 1) { current++; render(); }
    });
  });
  form.querySelectorAll("[data-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (current > 0) { current--; render(); }
    });
  });

  // Снятие подсветки ошибки при вводе
  form.addEventListener("input", function (e) {
    if (e.target.classList) e.target.classList.remove("eg-invalid");
  });

  /* ---------- Условные блоки ---------- */
  function bindCond(radioValue, blockId) {
    form.querySelectorAll("input[type=radio]").forEach(function (r) {
      r.addEventListener("change", function () {
        var block = document.getElementById(blockId);
        if (!block) return;
        block.classList.toggle("eg-on", r.checked && r.value.indexOf(radioValue) === 0);
      });
    });
  }
  bindCond("Да, занимается", "egSportYes");
  bindCond("Да, есть", "egGroupYes");

  /* ---------- Сборка текста анкеты ---------- */
  function collect() {
    var d = new FormData(form);
    var lines = [];
    var L = function (label, key) {
      var vals = d.getAll(key).filter(function (v) { return String(v).trim(); });
      if (vals.length) lines.push(label + ": " + vals.join(", "));
    };

    lines.push("АНКЕТА · ДЕТСКИЕ ПРОГРАММЫ");
    lines.push("Дата: " + new Date().toLocaleString("ru-RU"));
    lines.push("");
    lines.push("— ФОРМАТ И КОНТАКТ —");
    L("Формат", "format");
    L("Родитель", "parentName");
    L("Телефон", "phone");
    L("Telegram", "telegram");
    L("Email", "email");
    L("Удобная связь", "contactWay");
    lines.push("");
    lines.push("— РЕБЁНОК —");
    L("Имя", "childName");
    L("Возраст", "age");
    L("Спорт", "doesSport");
    L("Какой спорт", "sport");
    L("Активность", "activity");
    L("Прошлый опыт", "experience");
    lines.push("");
    lines.push("— ДВИЖЕНИЕ —");
    L("Наблюдения", "movement");
    L("Подробнее", "movementNote");
    L("Желаемый результат", "goal");
    lines.push("");
    lines.push("— ЗДОРОВЬЕ —");
    L("Ограничения", "health");
    L("Травмы", "injuries");
    L("Аллергии", "allergy");
    L("Питание", "food");
    L("Питание, уточнение", "foodNote");
    L("Может понадобиться", "meds");
    L("Экстренный контакт", "emergency");
    L("Кто заберёт", "pickup");
    lines.push("");
    lines.push("— ХАРАКТЕР И ОБЩЕНИЕ —");
    L("Нравится", "likes");
    L("Не нравится на занятиях", "dislikes");
    L("В новой компании", "social");
    L("Особенности", "behaviour");
    L("Помогает включиться", "motivate");
    lines.push("");
    lines.push("— ОРГАНИЗАЦИЯ —");
    L("Удобные дни", "days");
    L("Своя компания", "ownGroup");
    L("Состав компании", "groupInfo");
    L("Источник", "source");
    L("Комментарий", "comment");
    lines.push("");
    lines.push("— СОГЛАСИЯ —");
    L("Данные", "consentData");
    L("Фото и видео", "consentPhoto");
    L("Достоверность", "consentTrue");

    return lines.join("\n");
  }

  /* ---------- Отправка ---------- */
  var text = "";
  var submitBtn = document.getElementById("egSubmit");

  function syncKidsSubmit() {
    if (!submitBtn) return;
    var step = form.querySelector('.eg-step[data-step="6"]') || form;
    var consents = step.querySelectorAll("input[type=checkbox][required]");
    var ok = Array.prototype.every.call(consents, function (c) { return c.checked; });
    submitBtn.disabled = !ok;
  }

  form.addEventListener("change", function (e) {
    if (e.target && e.target.name && String(e.target.name).indexOf("consent") === 0) {
      syncKidsSubmit();
    }
  });
  syncKidsSubmit();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(current)) return;
    if (submitBtn && submitBtn.disabled) return;

    text = collect();
    if (summary) summary.textContent = text;

    if (SUBMIT_MODE === "webhook" && WEBHOOK_URL) {
      var payload = {};
      new FormData(form).forEach(function (v, k) {
        payload[k] = payload[k] ? payload[k] + ", " + v : v;
      });
      payload.text = text;
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () { /* даже при ошибке показываем экран с текстом */ });

      var t = document.getElementById("egDoneText");
      if (t) t.textContent = "Спасибо. Анкета отправлена — я лично изучу её и свяжусь с вами. Ниже копия того, что вы заполнили.";
    }

    form.style.display = "none";
    var prog = document.querySelector("#eg-anketa .eg-progress");
    if (prog) prog.style.display = "none";
    if (done) done.classList.add("eg-on");
    scrollToTop();
  });

  /* ---------- Кнопка Telegram ---------- */
  var sendBtn = document.getElementById("egSend");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      copyText(text);
      window.open("https://t.me/" + TELEGRAM_USERNAME, "_blank", "noopener");
      sendBtn.textContent = "Текст скопирован · вставьте в чат";
    });
  }

  /* ---------- Кнопка копирования ---------- */
  var copyBtn = document.getElementById("egCopy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      copyText(text);
      copyBtn.textContent = "Скопировано";
      setTimeout(function () { copyBtn.textContent = "Скопировать текст анкеты"; }, 2200);
    });
  }

  function copyText(str) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(str);
        return;
      }
    } catch (e) {}
    var ta = document.createElement("textarea");
    ta.value = str;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  render();
})();
