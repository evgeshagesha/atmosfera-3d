"use client";

import { LEVEL_COPY, TEST_CONFIG, ZONES } from "../config";
import type { CSSProperties } from "react";
import { track } from "../analytics";
import type { TestResult } from "../types";
import styles from "../test.module.css";

export function ResultPreview({ result }: { result: TestResult }) {
  const copy = LEVEL_COPY[result.level];
  const resultUrl = `${TEST_CONFIG.resultUrls[result.level]}?session_id=${encodeURIComponent(result.sessionId)}`;
  return (
    <main className={styles.resultPage}>
      <div className={styles.resultGlow} />
      <section className={styles.resultCard}>
        <span className={styles.eyebrow}>РЕЗУЛЬТАТ</span>
        <div className={styles.scoreRing} style={{ "--score": result.total } as CSSProperties}>
          <div><strong>{result.total}</strong><span>ИЗ 100</span></div>
        </div>
        <p className={styles.levelLabel}>УРОВЕНЬ</p>
        <h1>{copy.title}</h1>
        <p className={styles.resultNote}>{copy.note}</p>

        <div className={styles.zoneList}>
          {result.zones.map((zone) => (
            <div className={zone.id === result.priorityZone ? styles.priorityZone : ""} key={zone.id}>
              <span>{zone.label}{zone.id === result.priorityZone && <small>ПРИОРИТЕТ</small>}</span>
              <i><b style={{ width: `${zone.score * 5}%` }} /></i>
              <strong>{zone.score}<small>/20</small></strong>
            </div>
          ))}
        </div>

        <div className={styles.resultFacts}>
          <div><span>ГЛАВНАЯ ЗОНА ВНИМАНИЯ</span><b>{ZONES[result.priorityZone].label}</b></div>
          <div><span>РАЗНИЦА МЕЖДУ СТОРОНАМИ</span><b>{result.asymmetry ? "Есть" : "Нет"}</b></div>
        </div>

        {result.safetyFlags.length > 0 && (
          <div className={styles.safetyNotice} role="note">
            <span>!</span>
            <p>Если во время теста появилась боль, онемение или головокружение — не выполняй движения через неприятные ощущения. При сохраняющихся симптомах лучше обратиться к специалисту.</p>
          </div>
        )}

        <a
          className={styles.primaryButton}
          href={resultUrl}
          onClick={() =>
            track("test_result_click", {
              level: result.level,
              score: result.total,
              priority_zone: result.priorityZone,
              session_id: result.sessionId,
              ...(result.attribution ?? {}),
            })
          }
        >
          ПОЛУЧИТЬ МОЙ ПЛАН <span>→</span>
        </a>
        <p className={styles.resultFootnote}>Это функциональная самооценка, а не медицинская диагностика.</p>
      </section>
    </main>
  );
}
