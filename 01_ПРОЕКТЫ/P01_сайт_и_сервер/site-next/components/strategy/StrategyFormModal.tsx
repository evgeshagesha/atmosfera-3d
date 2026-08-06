"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import {
  STRATEGY_CONTENT,
  STRATEGY_PRODUCT,
  type FormField,
  type FormStep,
} from "@/lib/strategy/content";

type FormState = Record<string, string | string[] | boolean>;

function track(event: string, payload?: Record<string, unknown>) {
  try {
    const w = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
      ym?: (id: number, method: string, name: string, params?: Record<string, unknown>) => void;
    };
    w.dataLayer?.push({ event, ...payload });
    // Soft stub — real Metrika id may be injected elsewhere
    if (typeof w.ym === "function") {
      w.ym(0, "reachGoal", event, payload);
    }
  } catch {
    // analytics must never break UX
  }
}

function emptyState(): FormState {
  return {
    company_website: "",
    name: "",
    age: "",
    city: "",
    occupation: "",
    occupationOther: "",
    concerns: [],
    concernsOther: "",
    goal: "",
    training: "",
    limits: "",
    limitsDetail: "",
    motivation: "",
    startWhen: "",
    readiness: "",
    telegram: "",
    phone: "",
    consent: false,
  };
}

function validateStep(step: FormStep, state: FormState): string | null {
  const form = STRATEGY_CONTENT.form;

  for (const field of step.fields) {
    if (field.type === "consent") {
      if (!state.consent) return form.consentRequired;
      continue;
    }

    if (field.type === "checkbox") {
      const values = Array.isArray(state[field.key]) ? (state[field.key] as string[]) : [];
      if (field.required && values.length === 0) return form.requiredHint;
      if (values.includes("other") && !String(state[field.otherKey ?? ""] ?? "").trim()) {
        return form.requiredHint;
      }
      continue;
    }

    if (field.type === "radio") {
      const value = String(state[field.key] ?? "").trim();
      if (field.required && !value) return form.requiredHint;
      if (field.otherKey && value === "other" && !String(state[field.otherKey] ?? "").trim()) {
        return form.requiredHint;
      }
      if (
        field.detailWhen &&
        field.detailKey &&
        field.detailWhen.includes(value) &&
        field.detailRequired &&
        !String(state[field.detailKey] ?? "").trim()
      ) {
        return form.requiredHint;
      }
      continue;
    }

    if (step.requireOneOf) continue;

    if (field.required && !String(state[field.key] ?? "").trim()) {
      return form.requiredHint;
    }
  }

  if (step.requireOneOf) {
    const ok = step.requireOneOf.some((key) => String(state[key] ?? "").trim());
    if (!ok) return form.contactRequired;
  }

  return null;
}

function FieldControl({
  field,
  state,
  onChange,
  consentHtml,
}: {
  field: FormField;
  state: FormState;
  onChange: (key: string, value: string | string[] | boolean) => void;
  consentHtml?: { prefix: string; href: string; label: string };
}) {
  if (field.type === "consent" && consentHtml) {
    return (
      <label className="st-consent">
        <input
          type="checkbox"
          checked={state.consent === true}
          onChange={(e) => onChange("consent", e.target.checked)}
        />
        <span>
          {consentHtml.prefix}{" "}
          <a href={consentHtml.href} target="_blank" rel="noopener noreferrer">
            {consentHtml.label}
          </a>
          .
        </span>
      </label>
    );
  }

  if (field.type === "radio") {
    const value = String(state[field.key] ?? "");
    return (
      <div className="st-options" role="radiogroup" aria-label={field.label}>
        {field.options.map((opt) => (
          <label key={opt.value} className={`st-option ${value === opt.value ? "is-on" : ""}`}>
            <input
              type="radio"
              name={field.key}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(field.key, opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
        {field.otherKey && value === "other" ? (
          <input
            className="st-input"
            type="text"
            value={String(state[field.otherKey] ?? "")}
            maxLength={field.otherMaxLength}
            placeholder={field.otherLabel}
            onChange={(e) => onChange(field.otherKey!, e.target.value)}
          />
        ) : null}
        {field.detailKey && field.detailWhen?.includes(value) ? (
          <textarea
            className="st-input st-textarea"
            value={String(state[field.detailKey] ?? "")}
            maxLength={field.detailMaxLength}
            placeholder={field.detailLabel}
            rows={4}
            onChange={(e) => onChange(field.detailKey!, e.target.value)}
          />
        ) : null}
      </div>
    );
  }

  if (field.type === "checkbox") {
    const values = Array.isArray(state[field.key]) ? (state[field.key] as string[]) : [];
    return (
      <div className="st-options" role="group" aria-label={field.label}>
        {field.options.map((opt) => {
          const on = values.includes(opt.value);
          return (
            <label key={opt.value} className={`st-option ${on ? "is-on" : ""}`}>
              <input
                type="checkbox"
                value={opt.value}
                checked={on}
                onChange={() => {
                  const next = on
                    ? values.filter((v) => v !== opt.value)
                    : [...values, opt.value];
                  onChange(field.key, next);
                }}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
        {field.otherKey && values.includes("other") ? (
          <input
            className="st-input"
            type="text"
            value={String(state[field.otherKey] ?? "")}
            maxLength={field.otherMaxLength}
            placeholder={field.otherLabel}
            onChange={(e) => onChange(field.otherKey!, e.target.value)}
          />
        ) : null}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="st-field">
        <span className="st-label">{field.label}</span>
        <textarea
          className="st-input st-textarea"
          value={String(state[field.key] ?? "")}
          maxLength={field.maxLength}
          rows={field.rows ?? 4}
          required={field.required}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </label>
    );
  }

  if (field.type === "text" || field.type === "tel") {
    return (
      <label className="st-field">
        <span className="st-label">{field.label}</span>
        <input
          className="st-input"
          type={field.type}
          value={String(state[field.key] ?? "")}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          autoComplete={field.autocomplete}
          inputMode={field.inputmode as "text" | "numeric" | "tel" | undefined}
          required={field.required}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </label>
    );
  }

  return null;
}

export default function StrategyFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const formCopy = STRATEGY_CONTENT.form;
  const steps = formCopy.steps;
  const titleId = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<FormState>(emptyState);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const step = steps[stepIndex];
  const progress = useMemo(
    () => ((stepIndex + 1) / steps.length) * 100,
    [stepIndex, steps.length],
  );

  const reset = useCallback(() => {
    setStepIndex(0);
    setState(emptyState());
    setError(null);
    setSubmitting(false);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    track("strategy_form_open");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const setField = (key: string, value: string | string[] | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const goNext = () => {
    const err = validateStep(step, state);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const submit = async () => {
    const err = validateStep(step, state);
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);
    setError(null);
    track("strategy_form_submit_attempt");

    try {
      const res = await fetch(STRATEGY_PRODUCT.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !json?.ok) {
        setError(json?.error || formCopy.networkError);
        track("strategy_form_submit_error");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      track("strategy_form_submit_success");
    } catch {
      setError(formCopy.networkError);
      track("strategy_form_submit_error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="st-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="st-modal__backdrop" aria-label="Закрыть" onClick={onClose} />
      <div className="st-modal__panel" ref={panelRef} tabIndex={-1}>
        <button
          type="button"
          className="st-modal__close"
          aria-label={formCopy.closeLabel}
          onClick={onClose}
        >
          ×
        </button>

        {success ? (
          <div className="st-success">
            <h2 id={titleId}>{formCopy.successTitle}</h2>
            <p>{formCopy.successText}</p>
            <div className="st-form-nav">
              <button type="button" className="st-btn st-btn--primary" onClick={onClose}>
                {formCopy.successBack}
              </button>
              <a
                className="st-btn st-btn--ghost"
                href={STRATEGY_PRODUCT.telegramPublicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formCopy.successTelegram}
              </a>
            </div>
          </div>
        ) : (
          <>
            <header className="st-form-header">
              <h2 id={titleId}>{formCopy.title}</h2>
              <div className="st-progress" aria-hidden="true">
                <div className="st-progress__bar" style={{ width: `${progress}%` }} />
              </div>
              <p className="st-progress__text">
                {formCopy.progressLabel} {stepIndex + 1} / {steps.length}
              </p>
            </header>

            <form
              className="st-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (stepIndex === steps.length - 1) void submit();
                else goNext();
              }}
              noValidate
            >
              <div className="st-hp" aria-hidden="true">
                <label htmlFor="company_website">Сайт компании</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={String(state.company_website ?? "")}
                  onChange={(e) => setField("company_website", e.target.value)}
                />
              </div>

              <div className="st-step">
                <h3 className="st-step__q">{step.question}</h3>
                {step.hint ? <p className="st-step__hint">{step.hint}</p> : null}
                {step.fields.map((field) => (
                  <FieldControl
                    key={field.key}
                    field={field}
                    state={state}
                    onChange={setField}
                    consentHtml={{
                      prefix: formCopy.consentPrefix,
                      href: STRATEGY_PRODUCT.policyUrl,
                      label: formCopy.consentLinkLabel,
                    }}
                  />
                ))}
              </div>

              {error ? (
                <p className="st-form-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="st-form-nav">
                {stepIndex > 0 ? (
                  <button type="button" className="st-btn st-btn--ghost" onClick={goBack}>
                    {formCopy.back}
                  </button>
                ) : (
                  <span />
                )}
                {stepIndex < steps.length - 1 ? (
                  <button type="submit" className="st-btn st-btn--primary">
                    {formCopy.continue}
                  </button>
                ) : (
                  <button type="submit" className="st-btn st-btn--primary" disabled={submitting}>
                    {submitting ? "Отправка…" : formCopy.submit}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
