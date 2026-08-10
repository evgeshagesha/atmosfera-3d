"use client";

import type { FormEvent, KeyboardEvent, Ref } from "react";
import Link from "next/link";

import styles from "../anketaeg.module.css";
import type { AnswerValue, Question } from "../types";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScaleQuestion({
  question,
  value,
  onChange,
}: {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}) {
  const min = question.min ?? 0;
  const max = question.max ?? 10;
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <fieldset className={styles.scaleWrap}>
      <legend className={styles.srOnly}>{question.title}</legend>
      <div className={styles.scaleNumbers} role="radiogroup">
        {numbers.map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => onChange(n)}
            className={`${styles.scaleButton} ${value === n ? styles.scaleSelected : ""}`}
            aria-label={`${n} из ${max}`}
            aria-pressed={value === n}
          >
            {n}
          </button>
        ))}
      </div>
      <div className={styles.scaleLabels}>
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
    </fieldset>
  );
}

function MatrixQuestion({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
}) {
  return (
    <div className={styles.matrix} role="group" aria-label={question.title}>
      {question.rows?.map((row) => (
        <div className={styles.matrixRow} key={row.id}>
          <span>{row.label}</span>
          <div
            className={styles.matrixButtons}
            role="radiogroup"
            aria-label={row.label}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={`${styles.matrixButton} ${value[row.id] === n ? styles.matrixSelected : ""}`}
                onClick={() => onChange({ ...value, [row.id]: n })}
                aria-label={`${row.label}: ${n} из 5`}
                aria-pressed={value[row.id] === n}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function QuestionScreen({
  question,
  index,
  total,
  answer,
  error,
  submitting,
  honeypot,
  inputRef,
  onHoneypot,
  onUpdate,
  onChooseSingle,
  onToggleMulti,
  onPrevious,
  onSubmitForm,
  onKeyDown,
}: {
  question: Question;
  index: number;
  total: number;
  answer: AnswerValue | undefined;
  error: string;
  submitting: boolean;
  honeypot: string;
  inputRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>;
  onHoneypot: (value: string) => void;
  onUpdate: (id: string, value: AnswerValue) => void;
  onChooseSingle: (value: string) => void;
  onToggleMulti: (value: string) => void;
  onPrevious: () => void;
  onSubmitForm: (event: FormEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
}) {
  const isLast = index >= total - 1;

  return (
    <form className={styles.questionStage} onSubmit={onSubmitForm} onKeyDown={onKeyDown}>
      <div className={styles.questionCard} key={question.id} aria-live="polite">
        <div className={styles.questionNumber}>
          {String(index + 1).padStart(2, "0")}
        </div>
        {question.kicker && (
          <div className={styles.questionKicker}>{question.kicker}</div>
        )}
        <h2 id={`q-title-${question.id}`}>{question.title}</h2>
        {question.description && (
          <p
            className={styles.questionDescription}
            id={`q-desc-${question.id}`}
          >
            {question.description}
          </p>
        )}
        {question.optionalLabel && (
          <span className={styles.optional}>{question.optionalLabel}</span>
        )}

        {/* Honeypot — hidden from users */}
        <label
          className={styles.srOnly}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            overflow: "hidden",
          }}
        >
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => onHoneypot(e.target.value)}
          />
        </label>

        <div className={styles.answerArea}>
          {(question.type === "text" || question.type === "textarea") && (
            <label className={styles.textField}>
              <span className={styles.srOnly}>{question.title}</span>
              {question.type === "textarea" ? (
                <textarea
                  ref={inputRef as Ref<HTMLTextAreaElement>}
                  value={typeof answer === "string" ? answer : ""}
                  onChange={(e) => onUpdate(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  rows={5}
                  aria-labelledby={`q-title-${question.id}`}
                  aria-describedby={
                    question.description ? `q-desc-${question.id}` : undefined
                  }
                />
              ) : (
                <input
                  ref={inputRef as Ref<HTMLInputElement>}
                  value={typeof answer === "string" ? answer : ""}
                  onChange={(e) => onUpdate(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  autoComplete={
                    question.id === "email"
                      ? "email"
                      : question.id === "name"
                        ? "name"
                        : "off"
                  }
                  aria-labelledby={`q-title-${question.id}`}
                />
              )}
              <span className={styles.fieldLine} />
            </label>
          )}

          {question.type === "single" && (
            <fieldset className={styles.optionGrid}>
              <legend className={styles.srOnly}>{question.title}</legend>
              {question.options?.map((option, optionIndex) => {
                const selected = answer === option.value;
                return (
                  <button
                    type="button"
                    key={option.value}
                    className={`${styles.optionCard} ${selected ? styles.optionSelected : ""}`}
                    onClick={() => onChooseSingle(option.value)}
                    aria-pressed={selected}
                  >
                    <span className={styles.optionKey}>
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <span className={styles.optionDot} />
                  </button>
                );
              })}
            </fieldset>
          )}

          {question.type === "multi" && (
            <fieldset className={styles.optionGrid}>
              <legend className={styles.srOnly}>{question.title}</legend>
              {question.options?.map((option) => {
                const values = Array.isArray(answer) ? answer : [];
                const selected = values.includes(option.value);
                return (
                  <button
                    type="button"
                    key={option.value}
                    className={`${styles.optionCard} ${selected ? styles.optionSelected : ""}`}
                    onClick={() => onToggleMulti(option.value)}
                    aria-pressed={selected}
                  >
                    <span className={styles.checkboxMark}>
                      {selected ? "✓" : ""}
                    </span>
                    <span className={styles.optionLabel}>{option.label}</span>
                  </button>
                );
              })}
            </fieldset>
          )}

          {question.type === "scale" && (
            <ScaleQuestion
              question={question}
              value={typeof answer === "number" ? answer : undefined}
              onChange={(value) => onUpdate(question.id, value)}
            />
          )}

          {question.type === "matrix" && (
            <MatrixQuestion
              question={question}
              value={
                answer && typeof answer === "object" && !Array.isArray(answer)
                  ? (answer as Record<string, number>)
                  : {}
              }
              onChange={(value) => onUpdate(question.id, value)}
            />
          )}

          {question.type === "consent" && (
            <label className={styles.consentCard}>
              <input
                type="checkbox"
                checked={answer === true}
                onChange={(e) => onUpdate(question.id, e.target.checked)}
              />
              <span className={styles.consentCheck}>
                {answer === true ? "✓" : ""}
              </span>
              <span>
                Я согласен(а) на обработку переданных данных для целей
                исследования и связи со мной. С политикой обработки данных
                можно ознакомиться на странице{" "}
                <Link href="/policy" target="_blank" rel="noreferrer">
                  /policy
                </Link>
                .
              </span>
            </label>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        <div className={styles.navigationRow}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onPrevious}
            disabled={index === 0}
          >
            <BackIcon /> Назад
          </button>

          <button
            type="submit"
            className={styles.continueButton}
            disabled={submitting}
          >
            {submitting
              ? "Отправляю…"
              : isLast
                ? "Получить тест"
                : "Продолжить"}
            {!submitting && <ArrowIcon />}
          </button>
        </div>

        <div className={styles.keyboardHint}>⌘ / Ctrl + Enter — продолжить</div>
      </div>
    </form>
  );
}
