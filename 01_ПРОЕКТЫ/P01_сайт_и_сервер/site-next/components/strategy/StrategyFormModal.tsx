"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

type Status = "idle" | "sending" | "sent" | "error";

function track(event: string, payload?: Record<string, unknown>) {
  try {
    const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer?.push({ event, ...payload });
  } catch {
    /* noop */
  }
}

export default function StrategyFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lead = STRATEGY_CONTENT.lead;
  const titleId = useId();
  const formId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [goal, setGoal] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
    setName("");
    setContact("");
    setContactMethod("");
    setGoal("");
    setConsent(false);
    setHoneypot("");
    submittingRef.current = false;
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

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submittingRef.current || status === "sending" || status === "sent") return;

      setError("");
      if (!name.trim()) {
        setError(lead.errors.name);
        return;
      }
      if (!contact.trim()) {
        setError(lead.errors.contact);
        return;
      }
      if (!contactMethod) {
        setError(lead.errors.contactMethod);
        return;
      }
      if (!consent) {
        setError(lead.errors.consent);
        return;
      }

      submittingRef.current = true;
      setStatus("sending");
      track("strategy_lead_submit");

      try {
        const res = await fetch(STRATEGY_PRODUCT.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_website: honeypot,
            name: name.trim(),
            contact: contact.trim(),
            contactMethod,
            goal: goal.trim(),
            consent: true,
          }),
        });

        const data = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string }
          | null;

        if (!res.ok || !data?.ok) {
          setStatus("error");
          setError(data?.error || lead.errors.network);
          submittingRef.current = false;
          track("strategy_lead_error");
          return;
        }

        setStatus("sent");
        track("strategy_lead_success");
      } catch {
        setStatus("error");
        setError(lead.errors.network);
        submittingRef.current = false;
        track("strategy_lead_error");
      }
    },
    [name, contact, contactMethod, goal, consent, honeypot, lead.errors, status],
  );

  if (!open) return null;

  const isSuccess = status === "sent";

  return (
    <div
      className={isSuccess ? "st-modal st-modal--success" : "st-modal"}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="st-modal__backdrop"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="st-modal__panel" ref={panelRef} tabIndex={-1}>
        <button
          type="button"
          className="st-modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>

        {isSuccess ? (
          <div className="st-modal-success">
            <p className="st-modal-success__eyebrow">Персональная стратегия тела</p>
            <h2 id={titleId} className="st-modal-success__title">
              {lead.success.title}
            </h2>
            <p className="st-modal-success__line">{lead.success.line1}</p>
            <p className="st-modal-success__body">{lead.success.line2}</p>
            <p className="st-modal-success__line">{lead.success.line3}</p>
            <p className="st-modal-success__sign">{lead.success.signature}</p>
            <button type="button" className="st-btn st-btn--primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <header className="st-form-header">
              <h2 id={titleId}>{lead.title}</h2>
              <p className="st-modal__lead">{lead.body}</p>
            </header>

            <form className="st-lead-form" onSubmit={onSubmit} noValidate>
              <div className="st-hp" aria-hidden="true">
                <label htmlFor={`${formId}-hp`}>Company</label>
                <input
                  id={`${formId}-hp`}
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="st-field">
                <label className="st-label" htmlFor={`${formId}-name`}>
                  {lead.fields.name.label}
                </label>
                <input
                  id={`${formId}-name`}
                  className="st-input"
                  name="name"
                  autoComplete="name"
                  maxLength={80}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lead.fields.name.placeholder}
                  disabled={status === "sending"}
                />
              </div>

              <div className="st-field">
                <label className="st-label" htmlFor={`${formId}-contact`}>
                  {lead.fields.contact.label}
                </label>
                <input
                  id={`${formId}-contact`}
                  className="st-input"
                  name="contact"
                  autoComplete="tel"
                  maxLength={120}
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={lead.fields.contact.placeholder}
                  disabled={status === "sending"}
                />
              </div>

              <fieldset className="st-field st-chips-field">
                <legend className="st-label">{lead.fields.contactMethod.label}</legend>
                <div
                  className="st-chips"
                  role="radiogroup"
                  aria-label={lead.fields.contactMethod.label}
                >
                  {lead.contactMethods.map((method) => {
                    const active = contactMethod === method.value;
                    return (
                      <button
                        key={method.value}
                        type="button"
                        className={active ? "st-chip is-on" : "st-chip"}
                        aria-pressed={active}
                        disabled={status === "sending"}
                        onClick={() => setContactMethod(method.value)}
                      >
                        {method.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="st-field">
                <label className="st-label" htmlFor={`${formId}-goal`}>
                  {lead.fields.goal.label}
                  <span className="st-optional"> (необязательно)</span>
                </label>
                <textarea
                  id={`${formId}-goal`}
                  className="st-input st-textarea"
                  name="goal"
                  rows={3}
                  maxLength={500}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={lead.fields.goal.placeholder}
                  disabled={status === "sending"}
                />
              </div>

              <label className="st-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === "sending"}
                />
                <span>
                  {lead.consentPrefix}{" "}
                  <Link href={STRATEGY_PRODUCT.policyUrl} target="_blank" rel="noopener noreferrer">
                    {lead.consentPolicy}
                  </Link>
                  {" · "}
                  <Link
                    href={STRATEGY_PRODUCT.personalConsentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lead.consentPersonal}
                  </Link>
                </span>
              </label>

              {error ? (
                <p className="st-form-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="st-btn st-btn--primary st-btn--hero"
                disabled={status === "sending"}
              >
                {status === "sending" ? lead.sending : lead.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
