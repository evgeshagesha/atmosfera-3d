import { CONSENT_CHECKBOX_NAME, consentCheckboxLabelHtml } from "@/lib/legal/consent";

const WRAP_ATTR = "data-eg-consent";

/**
 * Injects a non-pre-checked PDN consent checkbox before the submit control.
 * Disables submit until checked. Idempotent.
 */
export function injectConsentCheckbox(
  form: HTMLFormElement,
  options: { submitSelector?: string } = {}
): () => void {
  if (form.querySelector(`[${WRAP_ATTR}]`)) {
    return wireExisting(form, options);
  }

  const wrap = document.createElement("div");
  wrap.setAttribute(WRAP_ATTR, "1");
  wrap.className = "eg-consent";
  wrap.innerHTML = `
    <label class="eg-consent__label">
      <input
        type="checkbox"
        class="eg-consent__input"
        name="${CONSENT_CHECKBOX_NAME}"
        value="yes"
        required
        autocomplete="off"
      />
      <span class="eg-consent__text">${consentCheckboxLabelHtml()}</span>
    </label>
    <p class="eg-consent__hint" hidden>Отметьте согласие, чтобы отправить форму.</p>
  `;

  const submit =
    (options.submitSelector
      ? form.querySelector(options.submitSelector)
      : null) ||
    form.querySelector(
      'button[type="submit"], input[type="submit"], .t-form__submit, .t-submit, [data-eg-submit]'
    );

  if (submit?.closest(".t-form__submit")) {
    submit.closest(".t-form__submit")!.before(wrap);
  } else if (submit?.parentElement) {
    submit.parentElement.insertBefore(wrap, submit);
  } else {
    form.appendChild(wrap);
  }

  ensureConsentStyles();
  return wireExisting(form, options);
}

function wireExisting(
  form: HTMLFormElement,
  options: { submitSelector?: string } = {}
): () => void {
  const input = form.querySelector<HTMLInputElement>(
    `[${WRAP_ATTR}] .eg-consent__input, input[name="${CONSENT_CHECKBOX_NAME}"]`
  );
  const hint = form.querySelector<HTMLElement>(`[${WRAP_ATTR}] .eg-consent__hint`);
  const submits = collectSubmits(form, options.submitSelector);

  const sync = () => {
    const ok = Boolean(input?.checked);
    for (const el of submits) {
      if (el instanceof HTMLButtonElement || el instanceof HTMLInputElement) {
        el.disabled = !ok;
      } else {
        el.setAttribute("aria-disabled", ok ? "false" : "true");
        (el as HTMLElement).style.pointerEvents = ok ? "" : "none";
        (el as HTMLElement).style.opacity = ok ? "" : "0.45";
      }
    }
    if (hint) hint.hidden = ok;
  };

  const onInvalid = (event: Event) => {
    if (!input?.checked) {
      event.preventDefault();
      if (hint) hint.hidden = false;
    }
  };

  input?.addEventListener("change", sync);
  form.addEventListener("submit", onInvalid);
  sync();

  return () => {
    input?.removeEventListener("change", sync);
    form.removeEventListener("submit", onInvalid);
  };
}

function collectSubmits(
  form: HTMLFormElement,
  submitSelector?: string
): HTMLElement[] {
  const nodes = new Set<HTMLElement>();
  if (submitSelector) {
    form.querySelectorAll<HTMLElement>(submitSelector).forEach((el) => nodes.add(el));
  }
  form
    .querySelectorAll<HTMLElement>(
      'button[type="submit"], input[type="submit"], .t-submit, [data-eg-submit]'
    )
    .forEach((el) => nodes.add(el));
  return Array.from(nodes);
}

let stylesInjected = false;

function ensureConsentStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  if (document.getElementById("eg-consent-styles")) {
    stylesInjected = true;
    return;
  }
  const style = document.createElement("style");
  style.id = "eg-consent-styles";
  style.textContent = CONSENT_CSS;
  document.head.appendChild(style);
  stylesInjected = true;
}

const CONSENT_CSS = `
.eg-consent {
  margin: 14px 0 18px;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
  color: #1a1f26;
}
.eg-consent__label {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  cursor: pointer;
  color: inherit;
  font-size: 13px;
  line-height: 1.45;
}
.eg-consent__input {
  margin-top: 3px;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  accent-color: #3aa0e0;
}
.eg-consent__text a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.eg-consent__hint {
  margin: 8px 0 0;
  color: #b42318;
  font-size: 12px;
}
/* Dark surfaces (anketa / club overlays) */
.eg-legal-page .eg-consent,
.atm3d .eg-consent,
[data-theme="dark"] .eg-consent {
  border-color: rgba(210, 220, 232, 0.18);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.88);
}
.eg-legal-page .eg-consent__hint,
.atm3d .eg-consent__hint,
[data-theme="dark"] .eg-consent__hint {
  color: #ffb4b4;
}
`;
