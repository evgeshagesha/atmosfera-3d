"use client";

import { useCallback, useEffect, useState } from "react";
import { TEST_CONFIG } from "./config";
import { QUESTIONS } from "./questions";
import { collectAttribution, createSessionId } from "./query";
import { calculateResult } from "./scoring";
import { clearDraft, loadDraft, saveDraft, saveResult } from "./storage";
import { submitResult } from "./submit";
import { track } from "./analytics";
import type { AnswerValue, TestDraft, TestResult } from "./types";
import { BrandMark } from "./components/BrandMark";
import { Progress } from "./components/Progress";
import { QuestionCard } from "./components/QuestionCard";
import { ResultPreview } from "./components/ResultPreview";
import styles from "./test.module.css";

type Phase = "intro" | "test" | "result";

function initialDraft(): TestDraft {
  const params = new URLSearchParams(window.location.search);
  const attribution = collectAttribution(params);
  return {
    version: TEST_CONFIG.version,
    step: 0,
    answers: {},
    sessionId: createSessionId(),
    questionnaireId: attribution.questionnaireId,
    utm: attribution.utm,
    startedAt: new Date().toISOString(),
  };
}

export function BodyTest() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [draft, setDraft] = useState<TestDraft | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = loadDraft();
      const fromUrl = initialDraft();
      // Preserve questionnaire_id / UTM from anketaeg link even if a draft already exists.
      const draft = stored
        ? {
            ...stored,
            questionnaireId: fromUrl.questionnaireId ?? stored.questionnaireId,
            utm: { ...stored.utm, ...fromUrl.utm },
          }
        : fromUrl;
      setDraft(draft);
      setReady(true);
      track("test_view", {
        route: TEST_CONFIG.route,
        has_draft: Boolean(stored),
        questionnaire_id: draft.questionnaireId,
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && draft) saveDraft(draft);
  }, [draft, ready]);

  const activeStep = draft?.step;
  useEffect(() => {
    if (phase === "test" && activeStep !== undefined) {
      track("test_step_view", { step: activeStep + 1, question_id: QUESTIONS[activeStep]?.id });
    }
  }, [phase, activeStep]);

  const current = draft ? QUESTIONS[draft.step] : null;
  const currentAnswer = current ? draft?.answers[current.id] : undefined;
  const canContinue = Boolean(
    current && currentAnswer !== undefined && (!Array.isArray(currentAnswer) || currentAnswer.length > 0),
  );
  const hasProgress = Boolean(draft && (draft.step > 0 || Object.keys(draft.answers).length));

  const start = useCallback((restart = false) => {
    const nextDraft = restart ? initialDraft() : (draft ?? initialDraft());
    if (restart) clearDraft();
    setDraft(nextDraft);
    setDirection("next");
    setPhase("test");
    track(restart || !hasProgress ? "test_start" : "test_resume", { session_id: nextDraft.sessionId });
  }, [draft, hasProgress]);

  const answer = (value: AnswerValue) => {
    if (!draft || !current) return;
    setDraft({ ...draft, answers: { ...draft.answers, [current.id]: value } });
    track("test_answer", { question_id: current.id, value });
  };

  const back = () => {
    if (!draft) return;
    if (draft.step === 0) return setPhase("intro");
    setDirection("back");
    setDraft({ ...draft, step: draft.step - 1 });
  };

  const next = () => {
    if (!draft || !current || !canContinue) return;
    if (draft.step < QUESTIONS.length - 1) {
      setDirection("next");
      setDraft({ ...draft, step: draft.step + 1 });
      return;
    }
    const completed = calculateResult(draft.answers, draft);
    saveResult(completed);
    clearDraft();
    setResult(completed);
    setPhase("result");
    track("test_complete", { score: completed.total, level: completed.level, safety_flags: completed.safetyFlags });
    void submitResult(completed, draft).catch(() => undefined);
  };

  const progress = draft ? draft.step + 1 : 1;
  if (!ready || !draft) return <div className={styles.loading} aria-label="Загрузка" />;
  if (phase === "result" && result) return <ResultPreview result={result} />;

  return (
    <main className={styles.shell}>
      <div className={styles.ambient} aria-hidden="true"><i /><i /><i /></div>
      <header className={styles.header}>
        <BrandMark />
        {phase === "test" && <button className={styles.closeButton} type="button" onClick={() => setPhase("intro")} aria-label="Сохранить и выйти">×</button>}
      </header>

      {phase === "intro" ? (
        <section className={styles.intro}>
          <span className={styles.eyebrow}>EG · ФУНКЦИОНАЛЬНАЯ ДИАГНОСТИКА</span>
          <h1>ПРОВЕРЬ СВОЁ ТЕЛО.<br /><em>УЗНАЙ, НАД ЧЕМ РАБОТАТЬ.</em></h1>
          <p>6 простых двигательных тестов, которые покажут сильные и слабые стороны твоего тела и помогут понять, что улучшить в первую очередь.</p>
          <div className={styles.introMeta}>
            <span><b>5–7</b><small>МИНУТ</small></span>
            <span><b>6</b><small>ТЕСТОВ</small></span>
            <span><small>ПЕРСОНАЛЬНЫЙ РЕЗУЛЬТАТ</small></span>
          </div>
          <button className={styles.primaryButton} type="button" onClick={() => start(false)}>
            {hasProgress ? "ПРОДОЛЖИТЬ ТЕСТ" : "НАЧАТЬ ТЕСТ"} <span>→</span>
          </button>
          {hasProgress && <button className={styles.textButton} type="button" onClick={() => start(true)}>Начать заново</button>}
          <div className={styles.introTrust}><i>✓</i><span>Прогресс сохраняется автоматически</span></div>
        </section>
      ) : current ? (
        <div className={styles.testLayout}>
          <Progress current={progress} total={QUESTIONS.length} />
          <div className={`${styles.step} ${direction === "back" ? styles.stepBack : ""}`} key={current.id}>
            <QuestionCard question={current} value={draft.answers[current.id]} onChange={answer} />
          </div>
          <nav className={styles.nav} aria-label="Навигация по тесту">
            <button className={styles.backButton} type="button" onClick={back}>← <span>НАЗАД</span></button>
            <button className={styles.nextButton} type="button" disabled={!canContinue} onClick={next}>
              {draft.step === QUESTIONS.length - 1 ? "ПОЛУЧИТЬ РЕЗУЛЬТАТ" : "ДАЛЕЕ"} <span>→</span>
            </button>
          </nav>
        </div>
      ) : null}
      <footer className={styles.footer}>EG · ДВИЖЕНИЕ · ДЫХАНИЕ · ДИСЦИПЛИНА</footer>
    </main>
  );
}
