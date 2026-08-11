"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BrandMark } from "../components/BrandMark";
import { track } from "../analytics";
import { ZONES } from "../config";
import { loadResult } from "../storage";
import type { LevelId, TestResult, ZoneId } from "../types";
import { RESULT_GUIDES, ZONE_ACTIONS } from "./content";
import { RESULT_LINKS } from "./result-config";
import styles from "./result-guide.module.css";

const FALLBACK_SCORES: Record<LevelId, number> = {
  base: 48,
  integration: 68,
  progression: 88,
};

const FALLBACK_ZONES: Record<LevelId, Record<ZoneId, number>> = {
  base: { breath: 10, posture: 8, pelvis: 9, movement: 10, legs: 11 },
  integration: { breath: 15, posture: 12, pelvis: 14, movement: 13, legs: 14 },
  progression: { breath: 18, posture: 17, pelvis: 18, movement: 17, legs: 18 },
};

export function ResultGuidePage({ level }: { level: LevelId }) {
  const guide = RESULT_GUIDES[level];
  const [stored, setStored] = useState<TestResult | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const result = loadResult();
      const matched = result?.level === level ? result : null;
      setStored(matched);
      track("result_page_view", {
        level,
        score: matched?.total ?? FALLBACK_SCORES[level],
        priority_zone: matched?.priorityZone,
        session_id: matched?.sessionId,
        ...(matched?.attribution ?? {}),
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [level]);

  const score = stored?.total ?? FALLBACK_SCORES[level];
  const zones = stored?.zones ?? (Object.keys(ZONES) as ZoneId[]).map((id) => ({
    id,
    label: ZONES[id].label,
    score: FALLBACK_ZONES[level][id],
    max: 20 as const,
  }));
  const priorityZone = stored?.priorityZone ?? [...zones].sort((a, b) => a.score - b.score)[0].id;
  const priority = ZONE_ACTIONS[priorityZone];

  return (
    <main className={`${styles.page} ${styles[level]}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <BrandMark />
        <span>ПЕРСОНАЛЬНЫЙ РАЗБОР · {guide.number}</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <span className={styles.eyebrow}>РЕЗУЛЬТАТ ТЕСТА · {guide.range} ИЗ 100</span>
            <p className={styles.levelLabel}>ТВОЙ УРОВЕНЬ</p>
            <h1>{guide.title}</h1>
            <p className={styles.kicker}>{guide.kicker}</p>
          </div>
          <div className={styles.score} style={{ "--score": score } as CSSProperties}>
            <div><strong>{score}</strong><span>ИЗ 100</span></div>
          </div>
        </div>
        <h2>{guide.hero}</h2>
        <p className={styles.heroSummary}>{guide.summary}</p>
      </section>

      <section className={styles.profile} aria-labelledby="profile-title">
        <div className={styles.sectionHead}>
          <span>01</span>
          <div><p>ТВОЙ ПРОФИЛЬ</p><h2 id="profile-title">Пять зон — одна система</h2></div>
        </div>
        <div className={styles.zoneGrid}>
          {zones.map((zone) => (
            <div className={zone.id === priorityZone ? styles.priorityRow : ""} key={zone.id}>
              <span>{zone.label}{zone.id === priorityZone && <small>ПРИОРИТЕТ</small>}</span>
              <i><b style={{ width: `${zone.score * 5}%` }} /></i>
              <strong>{zone.score}<small>/20</small></strong>
            </div>
          ))}
        </div>
        <div className={styles.profileFacts}>
          <div><span>ГЛАВНАЯ ЗОНА ВНИМАНИЯ</span><b>{ZONES[priorityZone].label}</b></div>
          <div><span>РАЗНИЦА МЕЖДУ СТОРОНАМИ</span><b>{stored?.asymmetry ? "Есть" : "Не выражена"}</b></div>
        </div>
      </section>

      <section className={styles.priority} aria-labelledby="priority-title">
        <div className={styles.sectionHead}>
          <span>02</span>
          <div><p>С ЧЕГО НАЧАТЬ</p><h2 id="priority-title">{priority.title}</h2></div>
        </div>
        <p>{priority.text}</p>
        <div className={styles.actionGrid}>
          {priority.actions.map((action, index) => (
            <div key={action}><span>0{index + 1}</span><p>{action}</p></div>
          ))}
        </div>
      </section>

      <section className={styles.stage} aria-labelledby="stage-title">
        <div className={styles.sectionHead}>
          <span>03</span>
          <div><p>ЗАДАЧА УРОВНЯ</p><h2 id="stage-title">Что важно сейчас</h2></div>
        </div>
        <blockquote>{guide.task}</blockquote>
        <div className={styles.indicators}>
          <p>Ты поймёшь, что двигаешься в правильную сторону, когда:</p>
          <ul>{guide.indicators.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className={styles.system} aria-labelledby="system-title">
        <div className={styles.sectionHead}>
          <span>04</span>
          <div><p>СИСТЕМА 3D</p><h2 id="system-title">Пять опор результата</h2></div>
        </div>
        <div className={styles.principleGrid}>
          {guide.principles.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.plan} aria-labelledby="plan-title">
        <div className={styles.sectionHead}>
          <span>05</span>
          <div><p>ТВОИ ПЕРВЫЕ 30 ДНЕЙ</p><h2 id="plan-title">Понятный маршрут без перегруза</h2></div>
        </div>
        <div className={styles.planMeta}>
          <div><span>СЕССИЯ</span><b>{guide.sessionDuration}</b></div>
          <div><span>РИТМ</span><b>{guide.sessionsPerWeek}</b></div>
        </div>
        <div className={styles.weekList}>
          {guide.weeks.map((week) => (
            <article key={week.week}>
              <div><span>{week.week}</span><h3>{week.title}</h3><p>{week.focus}</p></div>
              <ul>{week.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.tools} aria-labelledby="tools-title">
        <div className={styles.sectionHead}>
          <span>06</span>
          <div><p>БЕЗ ЛИШНЕГО</p><h2 id="tools-title">Что понадобится</h2></div>
        </div>
        <div className={styles.toolList}>{guide.equipment.map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.rules}>
          {guide.rules.map((rule) => <p key={rule}><i>✓</i>{rule}</p>)}
        </div>
      </section>

      {stored && stored.safetyFlags.length > 0 && (
        <aside className={styles.safety}>
          <span>!</span>
          <p><b>Обрати внимание на сигналы тела.</b> Если во время теста появилась боль, онемение, головокружение или потеря контроля — не выполняй движения через неприятные ощущения. При сохраняющихся симптомах обратись к профильному специалисту.</p>
        </aside>
      )}

      <section className={styles.nextStep} aria-labelledby="next-title">
        <span className={styles.eyebrow}>07 · СЛЕДУЮЩИЙ ШАГ</span>
        <h2 id="next-title">Выбери формат, который подходит тебе сейчас</h2>

        <div className={styles.ctaGrid}>
          <article className={styles.freeCard}>
            <span>САМОСТОЯТЕЛЬНО</span>
            <h3>Бесплатный материал</h3>
            <p>{guide.youtubeLead}</p>
            <a href={RESULT_LINKS.youtube} target="_blank" rel="noreferrer" onClick={() => track("result_youtube_click", { level, score, priority_zone: priorityZone, session_id: stored?.sessionId, ...(stored?.attribution ?? {}) })}>СМОТРЕТЬ НА YOUTUBE <b>↗</b></a>
          </article>

          <article className={styles.consultCard}>
            <span>ПЕРСОНАЛЬНО · 30 ДНЕЙ</span>
            <h3>Программа, собранная под твоё тело и твою жизнь</h3>
            <p>{guide.consultationLead}</p>
            <p>Я профессиональный спортсмен и больше 15 лет живу внутри режима, дисциплины, тренировок и постоянного восстановления. Более 200 человек уже начали менять своё тело и жизнь через эту систему.</p>
            <ul>
              <li>план действий на каждый день;</li>
              <li>нагрузка под твой уровень и приоритетную зону;</li>
              <li>движение, дыхание, восстановление и питание в одной системе;</li>
              <li>индивидуальный подход и понятная прогрессия.</li>
            </ul>
            <a href={RESULT_LINKS.consultation} target="_blank" rel="noreferrer" onClick={() => track("result_consultation_click", { level, score, priority_zone: priorityZone, session_id: stored?.sessionId, ...(stored?.attribution ?? {}) })}>УЗНАТЬ О ПЕРСОНАЛЬНОЙ ПРОГРАММЕ <b>→</b></a>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <BrandMark />
        <p>ДВИЖЕНИЕ · ДЫХАНИЕ · ДИСЦИПЛИНА</p>
        <small>Материал носит образовательный характер и не является медицинской диагностикой или индивидуальным медицинским назначением.</small>
      </footer>
    </main>
  );
}
