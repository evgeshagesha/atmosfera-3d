"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { LEGAL_ROUTES } from "@/lib/legal/consent";

type ConsentCheckboxProps = {
  /** Called when checked state changes (for parent submit disable). */
  onChange?: (checked: boolean) => void;
  /** Form field name */
  name?: string;
  className?: string;
  /** Dark (default) or light surface */
  tone?: "dark" | "light";
};

/**
 * Explicit PDN consent — never pre-checked.
 * Parent should disable submit while `checked === false`.
 */
export default function ConsentCheckbox({
  onChange,
  name = "consent_pdn",
  className = "",
  tone = "dark",
}: ConsentCheckboxProps) {
  const id = useId();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onChange?.(checked);
  }, [checked, onChange]);

  return (
    <div className={`eg-consent-react eg-consent-react--${tone} ${className}`.trim()}>
      <style dangerouslySetInnerHTML={{ __html: REACT_CONSENT_CSS }} />
      <label className="eg-consent-react__label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          value="yes"
          required
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="eg-consent-react__input"
          autoComplete="off"
        />
        <span className="eg-consent-react__text">
          Я даю{" "}
          <Link href={LEGAL_ROUTES.consent} target="_blank" rel="noopener noreferrer">
            согласие на обработку персональных данных
          </Link>{" "}
          и подтверждаю, что ознакомлен(а) с{" "}
          <Link href={LEGAL_ROUTES.policy} target="_blank" rel="noopener noreferrer">
            Политикой обработки персональных данных
          </Link>
          .
        </span>
      </label>
      {!checked ? (
        <p className="eg-consent-react__hint">Отметьте согласие, чтобы отправить форму.</p>
      ) : null}
    </div>
  );
}

const REACT_CONSENT_CSS = `
.eg-consent-react {
  margin: 14px 0 18px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(210, 220, 232, 0.18);
  background: rgba(255, 255, 255, 0.03);
}
.eg-consent-react--light {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
}
.eg-consent-react__label {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.45;
  color: inherit;
}
.eg-consent-react--dark .eg-consent-react__label { color: rgba(255,255,255,0.88); }
.eg-consent-react--light .eg-consent-react__label { color: rgba(20,24,30,0.88); }
.eg-consent-react__input {
  margin-top: 3px;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  accent-color: #5ec8ff;
}
.eg-consent-react__text a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  opacity: 0.92;
}
.eg-consent-react__hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #ff8f8f;
}
`;
