"use client";

import type { AnswerValue, Question } from "../types";
import { VideoPanel } from "./VideoPanel";
import styles from "../test.module.css";

interface Props {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

export function QuestionCard({ question, value, onChange }: Props) {
  const isMultiple = question.type === "multi-safety";

  const selectOption = (optionId: string) => {
    if (!isMultiple) return onChange(optionId);
    const selected = Array.isArray(value) ? value : [];
    if (optionId === "clear") return onChange(["clear"]);
    const withoutClear = selected.filter((id) => id !== "clear");
    onChange(
      withoutClear.includes(optionId)
        ? withoutClear.filter((id) => id !== optionId)
        : [...withoutClear, optionId],
    );
  };

  return (
    <section className={styles.questionCard} aria-labelledby={`title-${question.id}`}>
      <div className={styles.questionCopy}>
        <span className={styles.eyebrow}>{question.eyebrow}</span>
        <h1 id={`title-${question.id}`}>{question.title}</h1>
        {question.description && <p>{question.description}</p>}
      </div>

      {question.type === "video" && <VideoPanel question={question} />}

      <fieldset className={styles.options}>
        <legend className={styles.srOnly}>{isMultiple ? "Выберите один или несколько вариантов" : "Выберите один вариант"}</legend>
        {question.options?.map((option, index) => {
          const checked = Array.isArray(value) ? value.includes(option.id) : value === option.id;
          return (
            <label className={`${styles.option} ${checked ? styles.optionSelected : ""}`} key={option.id}>
              <input
                type={isMultiple ? "checkbox" : "radio"}
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => selectOption(option.id)}
              />
              <span className={styles.optionKey}>{String.fromCharCode(65 + index)}</span>
              <span className={styles.optionText}>
                <b>{option.label}</b>
                {option.detail && <small>{option.detail}</small>}
              </span>
              <span className={styles.optionCheck} aria-hidden="true">✓</span>
            </label>
          );
        })}
      </fieldset>

      {question.helperText && <p className={styles.skipNote}>{question.helperText}</p>}
    </section>
  );
}
