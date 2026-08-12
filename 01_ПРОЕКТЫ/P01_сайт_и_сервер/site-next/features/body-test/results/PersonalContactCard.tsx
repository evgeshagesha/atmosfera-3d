"use client";

import type { LevelId, ZoneId } from "../types";
import { track } from "../analytics";
import { RESULT_LINKS } from "./result-config";
import styles from "./result-guide.module.css";

const PERSONAL_LINES: Record<LevelId, string> = {
  base: "Помогу понять, с какой зоны лучше начать и какой объём нагрузки сейчас будет разумным.",
  integration: "Помогу понять, что сейчас важнее: закрепить слабое звено, увеличить нагрузку или изменить структуру тренировок.",
  progression: "Помогу определить, куда направить прогрессию дальше: сила, мобильность, мощность, координация или восстановление.",
};

type PersonalContactCardProps = {
  level: LevelId;
  score: number;
  priorityZone: ZoneId;
  sessionId?: string;
  attribution?: Record<string, string>;
};

/** Reusable mid-CTA between YouTube and 30-day personal program. */
export function PersonalContactCard({
  level,
  score,
  priorityZone,
  sessionId,
  attribution,
}: PersonalContactCardProps) {
  return (
    <article className={styles.personalCard}>
      <div className={styles.personalHead}>
        <img
          className={styles.personalAvatar}
          src="/anketaeg/eg-portrait.jpeg"
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.personalIdentity}>
          <span className={styles.personalLabel}>
            ЛИЧНО СО МНОЙ · 24 ЧАСА
            <em>ЛИЧНЫЙ КОНТАКТ</em>
          </span>
          <b>Евгений Гошев</b>
          <small>личный контакт</small>
        </div>
      </div>

      <h3>Хочешь, я помогу выбрать следующий шаг?</h3>
      <p>
        В течение 24 часов после прохождения теста ты можешь написать мне лично. Я посмотрю твой
        результат и подскажу, какой формат работы сейчас лучше подойдёт именно под твою ситуацию,
        цели и уровень подготовки.
      </p>
      <p className={styles.personalExtra}>
        Без обязательств — просто напиши мне и отправь свой результат теста.
      </p>
      <p className={styles.personalLine}>{PERSONAL_LINES[level]}</p>

      <a
        href={RESULT_LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("test_result_personal_contact_click", {
            level,
            score,
            priority_zone: priorityZone,
            destination: "telegram",
            source: "test_result",
            session_id: sessionId,
            ...(attribution ?? {}),
          })
        }
      >
        НАПИСАТЬ ЕВГЕНИЮ <b>→</b>
      </a>
    </article>
  );
}
