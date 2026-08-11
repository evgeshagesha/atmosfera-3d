"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import styles from "../anketaeg.module.css";
import BackgroundArt from "./BackgroundArt";
import FinalScreen from "./FinalScreen";
import IntroScreen from "./IntroScreen";
import QuestionScreen from "./QuestionScreen";
import { QUESTIONS } from "../data/questions";
import { ANKETA_EVENTS, trackAnketa } from "../lib/analytics";
import { calculateLeadScore } from "../lib/scoring";
import {
  captureUtmFromLocation,
  clearDraft,
  loadDraft,
  saveDraft,
  type AnketaDraft,
} from "../lib/storage";
import { isFilled } from "../lib/validation";
import type { AnketaAnswers, AnswerValue, AnketaUtm } from "../types";

const SUBMIT_URL = "/api/anketaeg/submit";
const SUBMIT_TIMEOUT_MS = 25_000;

export default function AnketaEgApp() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<AnketaAnswers>({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [utm, setUtm] = useState<AnketaUtm>({});
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [landingUrl, setLandingUrl] = useState("");
  const [referrer, setReferrer] = useState<string | null>(null);
  const [questionnaireId, setQuestionnaireId] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const submittingRef = useRef(false);
  const viewedRef = useRef(false);
  const milestonesRef = useRef({ p25: false, p50: false, p75: false });

  const visibleQuestions = useMemo(
    () => QUESTIONS.filter((q) => !q.showIf || q.showIf(answers)),
    [answers],
  );

  const current =
    visibleQuestions[Math.min(index, Math.max(0, visibleQuestions.length - 1))];
  const progress = visibleQuestions.length
    ? Math.round(((index + 1) / visibleQuestions.length) * 100)
    : 0;
  const currentAnswer = current ? answers[current.id] : undefined;

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    trackAnketa(ANKETA_EVENTS.view);

    const captured = captureUtmFromLocation();
    const draft = loadDraft();
    startTransition(() => {
      if (draft) {
        setAnswers(draft.answers);
        setIndex(Math.max(0, draft.index || 0));
        setHasSaved(true);
        setUtm(Object.keys(draft.utm || {}).length ? draft.utm : captured.utm);
        setStartedAt(draft.startedAt);
        setLandingUrl(draft.landingUrl || captured.landingUrl);
        setReferrer(draft.referrer ?? captured.referrer);
      } else {
        setUtm(captured.utm);
        setLandingUrl(captured.landingUrl);
        setReferrer(captured.referrer);
      }
    });
  }, []);

  useEffect(() => {
    if (!started || submitted) return;
    const draft: AnketaDraft = {
      answers,
      index,
      started: true,
      startedAt,
      utm,
      landingUrl,
      referrer,
    };
    saveDraft(draft);
  }, [answers, index, started, submitted, startedAt, utm, landingUrl, referrer]);

  useEffect(() => {
    if (!started || !current) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 140);
    return () => window.clearTimeout(timer);
  }, [started, current]);

  useEffect(() => {
    if (!started || submitted) return;
    trackAnketa(ANKETA_EVENTS.step, {
      index,
      section: current?.section,
      progress,
    });

    const m = milestonesRef.current;
    if (!m.p25 && progress >= 25) {
      m.p25 = true;
      trackAnketa(ANKETA_EVENTS.p25, { progress });
    }
    if (!m.p50 && progress >= 50) {
      m.p50 = true;
      trackAnketa(ANKETA_EVENTS.p50, { progress });
    }
    if (!m.p75 && progress >= 75) {
      m.p75 = true;
      trackAnketa(ANKETA_EVENTS.p75, { progress });
    }
  }, [started, submitted, index, progress, current?.section]);

  const update = (id: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const begin = () => {
    const now = new Date().toISOString();
    setStarted(true);
    setIndex(0);
    setStartedAt(now);
    trackAnketa(ANKETA_EVENTS.start);
  };

  const resume = () => {
    setStarted(true);
    trackAnketa(ANKETA_EVENTS.start, { resumed: true });
  };

  const restart = () => {
    clearDraft();
    setAnswers({});
    setIndex(0);
    setHasSaved(false);
    setError("");
    milestonesRef.current = { p25: false, p50: false, p75: false };
    const captured = captureUtmFromLocation();
    setUtm(captured.utm);
    setLandingUrl(captured.landingUrl);
    setReferrer(captured.referrer);
    begin();
  };

  const next = async () => {
    if (!current) return;
    if (!isFilled(current, currentAnswer)) {
      setError("Ответьте на этот вопрос, чтобы продолжить.");
      return;
    }

    if (index >= visibleQuestions.length - 1) {
      await submit();
      return;
    }

    setIndex((i) => Math.min(i + 1, visibleQuestions.length - 1));
    setError("");
  };

  const previous = () => {
    setIndex((i) => Math.max(0, i - 1));
    setError("");
  };

  const chooseSingle = (value: string) => {
    if (!current) return;
    update(current.id, value);
    if (current.autoAdvance !== false) {
      window.setTimeout(() => {
        setIndex((i) => {
          if (i < visibleQuestions.length - 1) return i + 1;
          return i;
        });
      }, 280);
    }
  };

  const toggleMulti = (value: string) => {
    if (!current) return;
    const currentValues = Array.isArray(currentAnswer) ? currentAnswer : [];
    const exclusive = value === "none" || value === "nothing";
    let nextValues: string[];

    if (currentValues.includes(value)) {
      nextValues = currentValues.filter((x) => x !== value);
    } else if (exclusive) {
      nextValues = [value];
    } else {
      const withoutExclusive = currentValues.filter(
        (x) => x !== "none" && x !== "nothing",
      );
      if (current.maxSelections && withoutExclusive.length >= current.maxSelections) {
        setError(`Можно выбрать максимум ${current.maxSelections}.`);
        return;
      }
      nextValues = [...withoutExclusive, value];
    }
    update(current.id, nextValues);
  };

  const submit = async () => {
    if (!current || !isFilled(current, currentAnswer)) return;
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    const lead = calculateLeadScore(answers);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          answers,
          company_website: honeypot,
          lead,
          meta: {
            submittedAt: new Date().toISOString(),
            page: landingUrl || window.location.href,
            referrer,
            utm,
            userAgent: navigator.userAgent,
            startedAt,
          },
        }),
      });

      if (!response.ok) throw new Error("submit_failed");

      const nextQuestionnaireId =
        globalThis.crypto?.randomUUID?.() ??
        `anketa-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setQuestionnaireId(nextQuestionnaireId);
      clearDraft();
      setSubmitted(true);
      trackAnketa(ANKETA_EVENTS.complete, {
        score: lead.score,
        segment: lead.segment,
        questionnaire_id: nextQuestionnaireId,
      });
    } catch {
      setError(
        "Не удалось отправить ответы. Ваши данные сохранены на этом устройстве.",
      );
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    void next();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void next();
    }
  };

  if (submitted) {
    return <FinalScreen questionnaireId={questionnaireId} utm={utm} />;
  }

  if (!started) {
    return (
      <IntroScreen
        hasSaved={hasSaved}
        onStart={begin}
        onResume={resume}
        onRestart={restart}
      />
    );
  }

  return (
    <main className={styles.pageShell}>
      <BackgroundArt />
      <header className={styles.formHeader}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={() => setStarted(false)}
          aria-label="Вернуться на первый экран"
        >
          <Image
            src="/anketaeg/eg-mark.png"
            alt="EG"
            width={58}
            height={39}
          />
        </button>
        <div className={styles.progressMeta} aria-live="polite">
          <span>{current?.section}</span>
          <strong>{progress}%</strong>
        </div>
      </header>
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      {current && (
        <QuestionScreen
          question={current}
          index={index}
          total={visibleQuestions.length}
          answer={currentAnswer}
          error={error}
          submitting={submitting}
          honeypot={honeypot}
          inputRef={inputRef}
          onHoneypot={setHoneypot}
          onUpdate={update}
          onChooseSingle={chooseSingle}
          onToggleMulti={toggleMulti}
          onPrevious={previous}
          onSubmitForm={onFormSubmit}
          onKeyDown={onKeyDown}
        />
      )}

      {error && error.includes("сохранены") && (
        <div className={styles.navigationRow} style={{ marginTop: 0, paddingBottom: 24 }}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void submit()}
            disabled={submitting}
          >
            Попробовать ещё раз
          </button>
        </div>
      )}

      <footer className={styles.formFooter}>
        <span>EG · АТМОСФЕРА 3D</span>
        <span>ДВИЖЕНИЕ · ДЫХАНИЕ · ДИСЦИПЛИНА</span>
      </footer>
    </main>
  );
}
