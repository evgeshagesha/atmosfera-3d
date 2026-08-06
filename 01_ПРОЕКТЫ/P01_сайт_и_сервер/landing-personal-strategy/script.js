(() => {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const content = window.SITE_CONTENT;
  if (!cfg || !content) {
    console.error("[landing] missing SITE_CONFIG or SITE_CONTENT");
    return;
  }

  const state = {
    stepIndex: 0,
    data: {},
    submitting: false,
    lastSubmitAt: 0,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* —— Analytics stub —— */
  function track(eventName, payload = {}) {
    const entry = {
      event: eventName,
      ts: new Date().toISOString(),
      ...payload,
    };
    window.__egAnalytics = window.__egAnalytics || [];
    window.__egAnalytics.push(entry);
    if (typeof window.egTrack === "function") {
      try {
        window.egTrack(entry);
      } catch (_) {
        /* ignore */
      }
    }
    // eslint-disable-next-line no-console
    console.debug("[analytics]", entry);
  }

  /* —— Bind simple text nodes —— */
  function bindContent() {
    $$("[data-bind]").forEach((el) => {
      const path = el.getAttribute("data-bind");
      const value = path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), content);
      if (typeof value === "string") el.textContent = value;
    });

    const photo = $("#hero-photo");
    if (photo) {
      photo.alt = content.hero.photoAlt;
      photo.src = cfg.heroImage;
      photo.addEventListener("error", () => {
        if (photo.dataset.triedFallback === "1") {
          photo.classList.add("is-missing");
          return;
        }
        photo.dataset.triedFallback = "1";
        photo.src = cfg.heroImageFallback;
      });
    }

    document.title = content.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", content.seo.description);

    $("#success-title").textContent = content.form.successTitle;
    $("#success-text").textContent = content.form.successText;
    $("#success-back").textContent = content.form.successBack;
    const tg = $("#success-telegram");
    if (tg && cfg.telegramPublicUrl) {
      tg.href = cfg.telegramPublicUrl;
      tg.textContent = content.form.successTelegram;
      tg.hidden = false;
    }
  }

  function iconSvg(name) {
    const icons = {
      person:
        '<svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.5c1.6-3.2 4-4.75 6.5-4.75s4.9 1.55 6.5 4.75"/></svg>',
      calendar:
        '<svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3.5v3M16 3.5v3M3.5 10h17"/></svg>',
      chat: '<svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 17.5 4 21l3.5-1.5H17a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v10a3 3 0 0 0 1 2.25Z"/></svg>',
      doc: '<svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h7"/></svg>',
      support:
        '<svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5v2.2a2.3 2.3 0 0 1-2.3 2.3h-.7a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5h1.2M12 4.5A7.5 7.5 0 0 0 4.5 12v2.2a2.3 2.3 0 0 0 2.3 2.3h.7A1.5 1.5 0 0 0 9 15v-2a1.5 1.5 0 0 0-1.5-1.5H6.3"/><path d="M12 19.5v0a3 3 0 0 0 2.6 1.5"/></svg>',
    };
    return icons[name] || icons.person;
  }

  function renderBenefits() {
    const list = $("#benefits-list");
    if (!list) return;
    list.innerHTML = content.benefits
      .map(
        (b) => `
      <li class="benefit-item">
        ${iconSvg(b.icon)}
        <div>
          <p class="benefit-title">${escapeHtml(b.title)}</p>
          <p class="benefit-text">${escapeHtml(b.text)}</p>
        </div>
      </li>`,
      )
      .join("");
  }

  function renderPlaceholders() {
    const root = $("#placeholders-root");
    if (!root) return;
    root.innerHTML = content.placeholders
      .map((s) => {
        let extra = "";
        if (s.id === "expert") {
          extra = `<ul class="placeholder-list">${content.expertBrief
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("")}</ul>`;
        }
        if (s.id === "inside") {
          extra = `<ul class="placeholder-list">${content.productIncludes
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("")}</ul>`;
        }
        if (s.id === "price") {
          extra = `<p class="placeholder-note">${escapeHtml(cfg.priceLabel)} · онлайн или очно в Москве</p>
            <p class="placeholder-note">Заявка без мгновенной оплаты.</p>`;
        }
        return `
        <!-- placeholder: #${s.id} — fill later -->
        <section class="placeholder-section" id="${s.id}" aria-labelledby="${s.id}-title">
          <div class="container">
            <h2 id="${s.id}-title">${escapeHtml(s.title)}</h2>
            <hr class="divider-bronze" />
            <p class="placeholder-note">${escapeHtml(s.note)}</p>
            ${extra}
          </div>
        </section>`;
      })
      .join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* —— Modal / form —— */
  const modal = $("#application-modal");
  const formFlow = $("#form-flow");
  const formSuccess = $("#form-success");
  const stepRoot = $("#step-root");
  const formError = $("#form-error");
  const btnBack = $("#btn-back");
  const btnNext = $("#btn-next");
  const btnSubmit = $("#btn-submit");
  const leadForm = $("#lead-form");
  const steps = content.form.steps;
  const totalSteps = steps.length;

  function openForm(source) {
    modal.hidden = false;
    document.body.classList.add("is-locked");
    formFlow.hidden = false;
    formSuccess.hidden = true;
    state.stepIndex = 0;
    clearError();
    renderStep();
    track("application_open", { source });
    const firstFocus = stepRoot.querySelector("input, textarea, button");
    (firstFocus || btnNext).focus();
  }

  function closeForm() {
    modal.hidden = true;
    document.body.classList.remove("is-locked");
  }

  function clearError() {
    formError.hidden = true;
    formError.textContent = "";
  }

  function showError(msg) {
    formError.hidden = false;
    formError.textContent = msg;
  }

  function optionLabel(field, value) {
    const opt = (field.options || []).find((o) => o.value === value);
    return opt ? opt.label : value;
  }

  function renderStep() {
    const step = steps[state.stepIndex];
    const n = state.stepIndex + 1;
    $("#progress-bar").style.width = `${(n / totalSteps) * 100}%`;
    $("#progress-text").textContent = `${content.form.progressLabel} ${n} / ${totalSteps}`;

    btnBack.hidden = state.stepIndex === 0;
    btnBack.textContent = content.form.back;
    const isLast = state.stepIndex === totalSteps - 1;
    btnNext.hidden = isLast;
    btnNext.textContent = content.form.continue;
    btnSubmit.hidden = !isLast;
    btnSubmit.textContent = content.form.submit;
    btnSubmit.disabled = state.submitting;

    let html = `<p class="step-question" id="step-q">${escapeHtml(step.question)}</p>`;
    if (step.hint) html += `<p class="step-hint">${escapeHtml(step.hint)}</p>`;

    step.fields.forEach((field) => {
      html += renderField(field, step);
    });

    stepRoot.innerHTML = html;
    clearError();
    wireConditionalFields(step);
  }

  function renderField(field, step) {
    const val = state.data[field.key];

    if (field.type === "consent") {
      return `
        <div class="field">
          <label class="consent-row">
            <input type="checkbox" name="consent" id="field-consent" ${state.data.consent ? "checked" : ""} />
            <span>${content.form.consentHtml}</span>
          </label>
        </div>`;
    }

    if (field.type === "radio" || field.type === "checkbox") {
      const multi = field.type === "checkbox";
      const selected = multi ? state.data[field.key] || [] : val;
      const options = field.options
        .map((opt) => {
          const checked = multi
            ? Array.isArray(selected) && selected.includes(opt.value)
            : selected === opt.value;
          return `
            <label class="option">
              <input
                type="${multi ? "checkbox" : "radio"}"
                name="${field.key}"
                value="${escapeHtml(opt.value)}"
                ${checked ? "checked" : ""}
              />
              <span>${escapeHtml(opt.label)}</span>
            </label>`;
        })
        .join("");

      let other = "";
      if (field.otherKey) {
        const show =
          multi
            ? Array.isArray(selected) && selected.includes("other")
            : selected === "other";
        other = `
          <div class="field other-field" data-other-for="${field.key}" ${show ? "" : "hidden"}>
            <label class="field-label" for="field-${field.otherKey}">${escapeHtml(field.otherLabel || "Уточните")}</label>
            <input type="text" id="field-${field.otherKey}" name="${field.otherKey}" maxlength="${field.otherMaxLength || 120}" value="${escapeHtml(state.data[field.otherKey] || "")}" />
          </div>`;
      }

      let detail = "";
      if (field.detailKey) {
        const show = field.detailWhen && field.detailWhen.includes(selected);
        detail = `
          <div class="field detail-field" data-detail-for="${field.key}" ${show ? "" : "hidden"}>
            <label class="field-label" for="field-${field.detailKey}">${escapeHtml(field.detailLabel || "Подробнее")}</label>
            <textarea id="field-${field.detailKey}" name="${field.detailKey}" maxlength="${field.detailMaxLength || 500}" rows="4">${escapeHtml(state.data[field.detailKey] || "")}</textarea>
          </div>`;
      }

      return `
        <div class="field" role="group" aria-labelledby="step-q">
          <span class="field-label">${escapeHtml(field.label)}</span>
          <div class="option-list">${options}</div>
          ${other}
          ${detail}
        </div>`;
    }

    if (field.type === "textarea") {
      return `
        <div class="field">
          <label class="field-label" for="field-${field.key}">${escapeHtml(field.label)}</label>
          <textarea id="field-${field.key}" name="${field.key}" rows="${field.rows || 4}" maxlength="${field.maxLength || 1000}" ${field.required ? "required" : ""}>${escapeHtml(val || "")}</textarea>
        </div>`;
    }

    return `
      <div class="field">
        <label class="field-label" for="field-${field.key}">${escapeHtml(field.label)}</label>
        <input
          id="field-${field.key}"
          name="${field.key}"
          type="${field.type || "text"}"
          value="${escapeHtml(val || "")}"
          maxlength="${field.maxLength || 120}"
          ${field.autocomplete ? `autocomplete="${field.autocomplete}"` : ""}
          ${field.inputmode ? `inputmode="${field.inputmode}"` : ""}
          ${field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : ""}
          ${field.required ? "required" : ""}
        />
      </div>`;
  }

  function wireConditionalFields(step) {
    step.fields.forEach((field) => {
      if (field.otherKey) {
        $$("input[name='" + field.key + "']", stepRoot).forEach((input) => {
          input.addEventListener("change", () => {
            const wrap = stepRoot.querySelector(`[data-other-for="${field.key}"]`);
            if (!wrap) return;
            if (field.type === "checkbox") {
              const checked = $$(`input[name="${field.key}"]:checked`, stepRoot).map((i) => i.value);
              wrap.hidden = !checked.includes("other");
            } else {
              wrap.hidden = input.value !== "other" || !input.checked;
            }
          });
        });
      }
      if (field.detailKey) {
        $$(`input[name="${field.key}"]`, stepRoot).forEach((input) => {
          input.addEventListener("change", () => {
            const wrap = stepRoot.querySelector(`[data-detail-for="${field.key}"]`);
            if (!wrap) return;
            const selected = $(`input[name="${field.key}"]:checked`, stepRoot);
            wrap.hidden = !(selected && field.detailWhen.includes(selected.value));
          });
        });
      }
    });
  }

  function collectStep() {
    const step = steps[state.stepIndex];
    const next = { ...state.data };

    for (const field of step.fields) {
      if (field.type === "consent") {
        next.consent = Boolean($("#field-consent")?.checked);
        continue;
      }
      if (field.type === "checkbox") {
        next[field.key] = $$(`input[name="${field.key}"]:checked`, stepRoot).map((i) => i.value);
        if (field.otherKey) {
          next[field.otherKey] = ($(`[name="${field.otherKey}"]`, stepRoot)?.value || "").trim();
        }
        continue;
      }
      if (field.type === "radio") {
        const selected = $(`input[name="${field.key}"]:checked`, stepRoot);
        next[field.key] = selected ? selected.value : "";
        if (field.otherKey) {
          next[field.otherKey] = ($(`[name="${field.otherKey}"]`, stepRoot)?.value || "").trim();
        }
        if (field.detailKey) {
          next[field.detailKey] = ($(`[name="${field.detailKey}"]`, stepRoot)?.value || "").trim();
        }
        continue;
      }
      const el = $(`[name="${field.key}"]`, stepRoot);
      next[field.key] = (el?.value || "").trim();
    }

    state.data = next;
  }

  function validateStep() {
    const step = steps[state.stepIndex];
    collectStep();

    for (const field of step.fields) {
      if (field.type === "consent") {
        if (!state.data.consent) {
          showError(content.form.consentRequired);
          return false;
        }
        continue;
      }

      if (field.type === "checkbox") {
        const arr = state.data[field.key] || [];
        if (field.required && arr.length === 0) {
          showError(content.form.requiredHint);
          return false;
        }
        if (arr.includes("other") && field.otherKey && !state.data[field.otherKey]) {
          showError(content.form.requiredHint);
          return false;
        }
        continue;
      }

      if (field.type === "radio") {
        if (field.required && !state.data[field.key]) {
          showError(content.form.requiredHint);
          return false;
        }
        if (state.data[field.key] === "other" && field.otherKey && !state.data[field.otherKey]) {
          showError(content.form.requiredHint);
          return false;
        }
        if (
          field.detailKey &&
          field.detailWhen?.includes(state.data[field.key]) &&
          field.detailRequired &&
          !state.data[field.detailKey]
        ) {
          showError(content.form.requiredHint);
          return false;
        }
        continue;
      }

      if (field.required && !state.data[field.key]) {
        showError(content.form.requiredHint);
        return false;
      }
    }

    if (step.requireOneOf) {
      const ok = step.requireOneOf.some((k) => state.data[k]);
      if (!ok) {
        showError(content.form.contactRequired);
        return false;
      }
    }

    return true;
  }

  function getUtm() {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const utm = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });
    return utm;
  }

  function labelForValue(stepId, fieldKey, raw) {
    const step = steps.find((s) => s.id === stepId || s.fields.some((f) => f.key === fieldKey));
    const field = step?.fields.find((f) => f.key === fieldKey);
    if (!field || !field.options) return raw;
    if (Array.isArray(raw)) {
      return raw
        .map((v) => {
          const label = optionLabel(field, v);
          if (v === "other" && field.otherKey && state.data[field.otherKey]) {
            return `${label}: ${state.data[field.otherKey]}`;
          }
          return label;
        })
        .join(", ");
    }
    let label = optionLabel(field, raw);
    if (raw === "other" && field.otherKey && state.data[field.otherKey]) {
      label = `${label}: ${state.data[field.otherKey]}`;
    }
    return label;
  }

  function buildPayload() {
    const d = state.data;
    return {
      product: cfg.productCode,
      productTitle: `${content.hero.titleLine1} ${content.hero.titleLine2} ${content.hero.titleAccent}`,
      priceRub: cfg.priceRub,
      submittedAt: new Date().toISOString(),
      sourcePage: cfg.sourcePage,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      utm: getUtm(),
      honeypot: $("#company_website")?.value || "",
      name: d.name || "",
      age: d.age || "",
      city: d.city || "",
      occupation: labelForValue("occupation", "occupation", d.occupation),
      occupationRaw: d.occupation || "",
      occupationOther: d.occupationOther || "",
      concerns: labelForValue("concerns", "concerns", d.concerns || []),
      concernsRaw: d.concerns || [],
      concernsOther: d.concernsOther || "",
      goal: labelForValue("goal", "goal", d.goal),
      goalRaw: d.goal || "",
      training: labelForValue("training", "training", d.training),
      trainingRaw: d.training || "",
      limits: labelForValue("limits", "limits", d.limits),
      limitsRaw: d.limits || "",
      limitsDetail: d.limitsDetail || "",
      motivation: d.motivation || "",
      startWhen: labelForValue("when_start", "startWhen", d.startWhen),
      startWhenRaw: d.startWhen || "",
      readiness: labelForValue("readiness", "readiness", d.readiness),
      readinessRaw: d.readiness || "",
      telegram: d.telegram || "",
      phone: d.phone || "",
      consent: Boolean(d.consent),
    };
  }

  async function submitLead() {
    if (state.submitting) return;
    const now = Date.now();
    if (now - state.lastSubmitAt < 4000) {
      showError("Подождите несколько секунд перед повторной отправкой.");
      return;
    }

    const payload = buildPayload();
    state.submitting = true;
    btnSubmit.disabled = true;
    clearError();
    track("application_submit");

    try {
      const res = await fetch(cfg.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "fail");
      }
      state.lastSubmitAt = Date.now();
      track("application_success", { delivered: json.delivered !== false });
      formFlow.hidden = true;
      formSuccess.hidden = false;
      state.data = {};
    } catch (err) {
      track("application_error", { message: String(err && err.message) });
      showError(content.form.networkError);
      // Offer retry via submit button remaining visible on last step
      btnSubmit.hidden = false;
      btnSubmit.disabled = false;
      btnSubmit.textContent = content.form.retry;
    } finally {
      state.submitting = false;
    }
  }

  /* —— Events —— */
  $$("[data-open-form]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const analytics = btn.getAttribute("data-analytics") || "open";
      if (analytics === "hero_cta_click") track("hero_cta_click");
      openForm(analytics);
    });
  });

  $$("[data-close-form]").forEach((el) => {
    el.addEventListener("click", closeForm);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeForm();
  });

  btnBack.addEventListener("click", () => {
    collectStep();
    if (state.stepIndex > 0) {
      state.stepIndex -= 1;
      renderStep();
    }
  });

  btnNext.addEventListener("click", () => {
    if (!validateStep()) return;
    track("application_step_complete", { step: state.stepIndex + 1 });
    if (state.stepIndex < totalSteps - 1) {
      state.stepIndex += 1;
      renderStep();
    }
  });

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    submitLead();
  });

  window.addEventListener("scroll", () => {
    $("#site-header")?.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* —— Init —— */
  bindContent();
  renderBenefits();
  renderPlaceholders();
})();
