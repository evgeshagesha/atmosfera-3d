"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BrandMark } from "../components/BrandMark";
import { track } from "../analytics";
import { ZONES } from "../config";
import { loadResult } from "../storage";
import type { LevelId, TestResult, ZoneId } from "../types";
import { INTEGRATION_ZONE_ACTIONS, PROGRESSION_ZONE_ACTIONS, RESULT_GUIDES, ZONE_ACTIONS } from "./content";
import { RESULT_LINKS } from "./result-config";
import styles from "./result-guide.module.css";

const FALLBACK_SCORES: Record<LevelId, number> = {
  base: 53,
  integration: 68,
  progression: 88,
};

const FALLBACK_ZONES: Record<LevelId, Record<ZoneId, number>> = {
  base: { breath: 11, posture: 13, pelvis: 10, movement: 8, legs: 11 },
  integration: { breath: 15, posture: 12, pelvis: 14, movement: 13, legs: 14 },
  progression: { breath: 18, posture: 17, pelvis: 18, movement: 17, legs: 18 },
};

function baseZoneInsight(zoneId: ZoneId, zoneScore: number, priorityZone: ZoneId) {
  if (zoneId === priorityZone) {
    const priorityCopy: Record<ZoneId, string> = {
      breath: "Именно здесь сейчас теряется больше всего качества: дыхание сложнее сохранять свободным во время движения.",
      posture: "Именно здесь сейчас теряется больше всего качества: плечам и грудному отделу пока не всегда хватает свободного движения.",
      pelvis: "Именно здесь сейчас теряется больше всего качества: тазу сложнее сохранять положение и контроль одновременно.",
      movement: "Именно здесь сейчас теряется больше всего качества: телу сложнее сохранять плавность, амплитуду и контроль одновременно.",
      legs: "Именно здесь сейчас теряется больше всего качества: голеностопу, стопе и балансу пока не всегда хватает подвижности и устойчивости.",
    };
    return priorityCopy[zoneId];
  }
  const copy: Record<ZoneId, string> = {
    breath: "База есть. Следующая задача — сохранять спокойное дыхание во время движения.",
    posture: "Здесь достаточно поддерживать подвижность и не компенсировать движение поясницей.",
    pelvis: "Контроль уже есть, но его стоит сделать более стабильным в движении.",
    movement: "Базовые движения получаются. Следующая задача — сделать их плавнее и увереннее.",
    legs: "Есть запас для улучшения подвижности голеностопа, устойчивости и переноса веса.",
  };
  return zoneScore >= 14 ? `Одна из сильных зон. ${copy[zoneId]}` : copy[zoneId];
}

function integrationZoneInsight(zoneId: ZoneId, zoneScore: number, priorityZone: ZoneId) {
  if (zoneId === priorityZone) {
    const priorityCopy: Record<ZoneId, string> = {
      breath: "Главный запас роста здесь: при нагрузке дыхание пока быстрее теряет объём и спокойный ритм.",
      posture: "Главный запас роста здесь: плечам и грудному отделу сложнее сохранять свободу движения под нагрузкой.",
      pelvis: "Главный запас роста здесь: тазу и корпусу пока не всегда хватает согласованного контроля в силовых движениях.",
      movement: "Главный запас роста здесь: при усложнении задачи техника и плавность движения начинают меняться.",
      legs: "Главный запас роста здесь: устойчивость стопы, голеностопа и одной ноги пока ограничивает прогрессию нагрузки.",
    };
    return priorityCopy[zoneId];
  }
  const copy: Record<ZoneId, string> = {
    breath: "Дыхательная база сформирована. Теперь сохраняй её в силовых упражнениях и переносках.",
    posture: "Подвижность есть. Следующая задача — удерживать положение рёбер и лопаток с сопротивлением.",
    pelvis: "Контроль таза уже доступен. Закрепляй его в тягах, выпадах и работе на одной ноге.",
    movement: "Базовые движения уверенные. Добавляй умеренный вес и разные направления без потери техники.",
    legs: "Опора сформирована. Развивай устойчивость и силу каждой ноги отдельно.",
  };
  return zoneScore >= 15 ? `Одна из сильных зон. ${copy[zoneId]}` : copy[zoneId];
}

function progressionZoneInsight(zoneId: ZoneId, zoneScore: number, priorityZone: ZoneId) {
  if (zoneId === priorityZone) {
    const priorityCopy: Record<ZoneId, string> = {
      breath: "Здесь остаётся главный запас роста: дыхание и восстановление между интенсивными сериями можно сделать стабильнее.",
      posture: "Здесь остаётся главный запас роста: плечевому поясу сложнее сохранять свободу и силу в быстрых движениях.",
      pelvis: "Здесь остаётся главный запас роста: передача усилия через таз и корпус пока ограничивает мощность.",
      movement: "Здесь остаётся главный запас роста: при увеличении скорости точность и координация снижаются раньше силы.",
      legs: "Здесь остаётся главный запас роста: одной ноге пока сложнее принимать нагрузку и стабилизировать движение.",
    };
    return priorityCopy[zoneId];
  }
  const copy: Record<ZoneId, string> = {
    breath: "Сильная зона. Используй дыхание для устойчивости и быстрого восстановления между подходами.",
    posture: "Хорошая подвижность и контроль. Сохраняй их при жимах, переносах и ротации.",
    pelvis: "Таз и корпус работают согласованно. Развивай передачу усилия в мощностных движениях.",
    movement: "Качество движения высокое. Усложняй скорость и координацию небольшими шагами.",
    legs: "Опора устойчива. Следующая задача — одноопорная сила и контроль смены направления.",
  };
  return zoneScore >= 17 ? `Одна из сильных зон. ${copy[zoneId]}` : copy[zoneId];
}

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
  const isBase = level === "base";
  const isIntegration = level === "integration";
  const isProgression = level === "progression";
  const isCompact = true;
  const priority = isProgression ? PROGRESSION_ZONE_ACTIONS[priorityZone] : isIntegration ? INTEGRATION_ZONE_ACTIONS[priorityZone] : ZONE_ACTIONS[priorityZone];
  const hasAsymmetry = stored?.asymmetry ?? (isBase || isIntegration);
  const isUpperBase = isBase && score >= 50;

  return (
    <main className={`${styles.page} ${styles[level]} ${isCompact ? styles.compact : ""}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <BrandMark />
        <span>ПЕРСОНАЛЬНЫЙ РАЗБОР · {guide.number}</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <span className={styles.eyebrow}>РЕЗУЛЬТАТ ТЕСТА</span>
            <p className={styles.levelLabel}>ТВОЙ УРОВЕНЬ</p>
            <h1>{guide.title}</h1>
            <p className={styles.kicker}>{guide.kicker}</p>
          </div>
          <div className={styles.score} style={{ "--score": score } as CSSProperties}>
            <div><strong>{score}</strong><span>ИЗ 100</span></div>
          </div>
        </div>
        <h2>{guide.hero}</h2>
        {isCompact ? (
          <div className={styles.baseHeroCopy}>
            <strong>{isBase ? (isUpperBase ? `${score} из 100 — верхняя граница уровня «БАЗА».` : `${score} из 100 — твой текущий результат уровня «БАЗА».`) : `${score} из 100 — твой текущий результат уровня «${guide.title}».`}</strong>
            <p>{isBase ? (isUpperBase ? "Тебе не нужно начинать с нуля или просто добавлять больше тренировок. Сейчас задача другая: убрать несколько ограничений, улучшить контроль и сделать привычные движения легче и увереннее." : "Тебе не нужно начинать с нуля или просто добавлять больше тренировок. Сейчас задача — убрать ограничения, улучшить контроль и сделать привычные движения легче и увереннее.") : guide.summary}</p>
            <small>Результат теста — не медицинский диагноз. Он показывает, как тело справилось с двигательными тестами сегодня.</small>
          </div>
        ) : <p className={styles.heroSummary}>{guide.summary}</p>}
        <div className={styles.levelScale} aria-label={`Результат ${score} из 100, уровень ${guide.title}`}>
          <div className={styles.scaleMeta}><span>ШКАЛА УРОВНЕЙ</span><b>{score} ИЗ 100 · {guide.title}</b></div>
          <div className={styles.scaleTrack}>
            <span className={level === "base" ? styles.activeBand : ""}>БАЗА · 0–54</span>
            <span className={level === "integration" ? styles.activeBand : ""}>ИНТЕГРАЦИЯ · 55–79</span>
            <span className={level === "progression" ? styles.activeBand : ""}>ПРОГРЕССИЯ · 80–100</span>
            <i style={{ left: `${Math.min(99, Math.max(1, score))}%` }}><b>ТЫ ЗДЕСЬ</b></i>
          </div>
          {stored && stored.rawLevel !== stored.level && <p>Уровень скорректирован с учётом сигналов безопасности — общий балл при этом сохранён.</p>}
        </div>
      </section>

      <section className={styles.profile} aria-labelledby="profile-title">
        <div className={styles.sectionHead}>
          <span>01</span>
          <div><p>ЧТО ПОКАЗАЛИ ТВОИ ТЕСТЫ</p><h2 id="profile-title">Пять зон тела</h2></div>
        </div>
        <div className={styles.zoneGrid}>
          {zones.map((zone) => (
            <div className={zone.id === priorityZone ? styles.priorityRow : ""} key={zone.id}>
              <div className={styles.zoneCopy}>
                <span>{zone.label}{zone.id === priorityZone && <small>ГЛАВНЫЙ ПРИОРИТЕТ</small>}</span>
                {isBase && <p>{baseZoneInsight(zone.id, zone.score, priorityZone)}</p>}
                {isIntegration && <p>{integrationZoneInsight(zone.id, zone.score, priorityZone)}</p>}
                {isProgression && <p>{progressionZoneInsight(zone.id, zone.score, priorityZone)}</p>}
              </div>
              <i><b style={{ width: `${zone.score * 5}%` }} /></i>
              <strong className={styles.zoneNumber}>{zone.score}<small>/20</small></strong>
            </div>
          ))}
        </div>
        <div className={styles.profileFacts}>
          <div><span>ГЛАВНАЯ ЗОНА ВНИМАНИЯ</span><b>{ZONES[priorityZone].label}</b></div>
          <div><span>РАЗНИЦА МЕЖДУ СТОРОНАМИ</span><b>{hasAsymmetry ? "Есть" : "Не выражена"}</b></div>
        </div>
        {isCompact && <p className={styles.profileAdvice}>{isBase ? "Не пытайся исправить всё сразу. В ближайшие недели достаточно сделать одну зону главным приоритетом, а остальные поддерживать." : isIntegration ? "Не добавляй сложность во все упражнения одновременно. Выбери одну приоритетную зону, сохрани сильные стороны и постепенно увеличивай сопротивление." : "Не увеличивай одновременно вес, скорость и объём. Выбери один параметр прогрессии, сохрани качество сильных зон и внимательно следи за восстановлением."}</p>}
      </section>

      {isCompact ? (
        <section className={styles.baseFocus} aria-labelledby="compact-focus-title">
          <div className={styles.sectionHead}>
            <span>02</span>
            <div><p>С ЧЕГО НАЧАТЬ</p><h2 id="compact-focus-title">{isBase ? "Сделай простые движения снова простыми" : isIntegration ? "Сохрани качество под нагрузкой" : "Добавляй мощность без потери контроля"}</h2></div>
          </div>
          <div className={styles.focusGrid}>
            <div className={styles.focusActions}>
              <span className={styles.focusLabel}>ГЛАВНАЯ ЗОНА · {priority.title}</span>
              <p>{priority.text}</p>
              <ol>{priority.actions.map((action) => <li key={action}>{action}</li>)}</ol>
            </div>
            <div className={styles.focusTask}>
              <span>ЗАДАЧА УРОВНЯ</span>
              <p>{guide.task}</p>
              <ul>{guide.indicators.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>
      ) : (
        <>
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
        </>
      )}

      {isCompact && guide.workout && (
        <section className={styles.workout} aria-labelledby="workout-title">
          <div className={styles.sectionHead}>
            <span>03</span>
            <div><p>{isBase ? "30–35 МИНУТ · 3 РАЗА В НЕДЕЛЮ" : isIntegration ? "40–50 МИНУТ · 3 РАЗА В НЕДЕЛЮ" : "45–60 МИНУТ · 3–4 РАЗА В НЕДЕЛЮ"}</p><h2 id="workout-title">{isBase ? "Твоя базовая тренировка" : isIntegration ? "Твоя тренировка интеграции" : "Твоя тренировка прогрессии"}</h2></div>
          </div>
          <div className={styles.workoutIntro}>
            <p>Не спеши. Работай примерно на <b>{isBase ? "5–6" : isIntegration ? "6–7" : "7–8"} из 10</b> по усилию. Между подходами отдыхай <b>{isBase ? "30–60" : isIntegration ? "45–75" : "60–120"} секунд</b>.</p>
            <strong>{isBase ? "Главная цель — качество движения, а не усталость." : isIntegration ? "Вес растёт только тогда, когда сохраняется техника." : "Скорость и мощность не должны опережать контроль."}</strong>
          </div>
          <div className={styles.workoutTimeline}>
            {guide.workout.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{step.time}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          {guide.weeklyRhythm && <div className={styles.weeklyRhythm}>{guide.weeklyRhythm.map((item) => <div key={item.day}><b>{item.day}</b><span>{item.title}</span></div>)}</div>}
          <p className={styles.rhythmNote}>{isBase ? "Не обязательно тренироваться тяжело каждый день. Регулярное качественное движение сейчас важнее объёма нагрузки." : isIntegration ? "Три качественные силовые тренировки дают больше, чем ежедневная тяжёлая нагрузка без восстановления." : "Разделяй тяжёлые силовые, мощностные и лёгкие дни. Высокая интенсивность работает только вместе с восстановлением."}</p>
          {guide.supportNotes && (
            <div className={styles.supportGrid}>
              {guide.supportNotes.map((note) => <article key={note.title}><h3>{note.title}</h3><p>{note.text}</p></article>)}
            </div>
          )}
        </section>
      )}

      {!isCompact && (
        <>
          <section className={styles.system} aria-labelledby="system-title">
            <div className={styles.sectionHead}>
              <span>04</span>
              <div><p>БОЛЬШЕ РЕЗУЛЬТАТА</p><h2 id="system-title">Пять вещей, которые работают</h2></div>
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
              <div><p>ТВОИ ПЕРВЫЕ 30 ДНЕЙ</p><h2 id="plan-title">Не пытайся изменить тело за неделю</h2></div>
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
        </>
      )}

      {isCompact && (
        <section className={`${styles.tools} ${styles.baseEquipment}`} aria-labelledby="equipment-title">
          <div className={styles.sectionHead}>
            <span>04</span>
            <div><p>МИНИМУМ ОБОРУДОВАНИЯ</p><h2 id="equipment-title">Что понадобится</h2></div>
          </div>
          <div className={styles.toolList}>{guide.equipment.map((item) => <span key={item}>{item}</span>)}</div>
        </section>
      )}

      {isCompact && guide.readinessCriteria && (
        <section className={styles.readiness} aria-labelledby="readiness-title">
          <div className={styles.sectionHead}>
            <span>05</span>
            <div><p>КРИТЕРИИ ПРОГРЕССА</p><h2 id="readiness-title">Как понять, что можно двигаться дальше</h2></div>
          </div>
          <p className={styles.readinessIntro}>{isBase ? "Не жди идеального тела. Ты готов переходить к более сложной работе, когда большая часть этих пунктов выполняется:" : isIntegration ? "Переходи к более сложной прогрессии, когда большая часть этих признаков сохраняется несколько недель:" : "Текущая прогрессия подходит тебе, если большая часть этих признаков сохраняется несколько недель:"}</p>
          <div className={styles.readinessGrid}>{guide.readinessCriteria.map((criterion) => <span key={criterion}>✓ {criterion}</span>)}</div>
          <p className={styles.readinessOutro}>{isProgression ? "Дальше увеличивай только один параметр за раз: рабочий вес, скорость, объём или сложность движения." : "После этого постепенно увеличивай сопротивление, объём и сложность упражнений."}</p>
          {!(stored && stored.safetyFlags.length > 0) && <aside>Резкая боль, онемение, выраженная слабость, головокружение или заметное ухудшение состояния — не повод «продавливать» упражнение. Остановись и при необходимости обратись к медицинскому специалисту.</aside>}
        </section>
      )}

      {stored && stored.safetyFlags.length > 0 && (
        <aside className={styles.safety}>
          <span>!</span>
          <p><b>Обрати внимание на сигналы тела.</b> Если во время теста появилась боль, онемение, головокружение или потеря контроля — не выполняй движения через неприятные ощущения. При сохраняющихся симптомах обратись к профильному специалисту.</p>
        </aside>
      )}

      <section className={styles.nextStep} aria-labelledby="next-title">
        <span className={styles.eyebrow}>{isCompact ? "06" : "07"} · СЛЕДУЮЩИЙ ШАГ</span>
        <h2 id="next-title">Выбери формат, который подходит тебе сейчас</h2>

        <div className={styles.ctaGrid}>
          <article className={styles.freeCard}>
            <span>САМОСТОЯТЕЛЬНО</span>
            <h3>{isBase ? "Хочешь начать самостоятельно?" : isIntegration ? "Хочешь закрепить результат самостоятельно?" : "Хочешь поддерживать форму самостоятельно?"}</h3>
            <p>{guide.youtubeLead}</p>
            <a href={RESULT_LINKS.youtube} target="_blank" rel="noreferrer" onClick={() => track("result_youtube_click", { level, score, priority_zone: priorityZone, session_id: stored?.sessionId, ...(stored?.attribution ?? {}) })}>{isCompact ? "СМОТРЕТЬ БЕСПЛАТНО" : "СМОТРЕТЬ НА YOUTUBE"} <b>↗</b></a>
          </article>

          <article className={styles.consultCard}>
            <span>ПЕРСОНАЛЬНО · 30 ДНЕЙ</span>
            <h3>{isBase ? "Хочешь программу именно под себя?" : isIntegration ? "Хочешь точно настроить нагрузку под себя?" : "Хочешь прогрессировать без случайных перегрузок?"}</h3>
            <p>{guide.consultationLead}</p>
            {!isBase && <p>Я профессиональный спортсмен и больше 15 лет живу внутри режима, дисциплины, тренировок и постоянного восстановления. Более 200 человек уже начали менять своё тело и жизнь через эту систему.</p>}
            <ul>
              {isBase ? <>
                <li>конкретные тренировки;</li>
                <li>упражнения под твои ограничения;</li>
                <li>нагрузка под твой уровень;</li>
                <li>дыхание и мобильность;</li>
                <li>восстановление и питание;</li>
                <li>контроль прогресса и корректировки.</li>
              </> : <>
                <li>план действий на каждый день;</li>
                <li>нагрузка под твой уровень и приоритетную зону;</li>
                <li>движение, дыхание, восстановление и питание в одной системе;</li>
                <li>индивидуальный подход и понятная прогрессия.</li>
              </>}
            </ul>
            {isCompact && <p className={styles.ctaClosing}>{isBase ? "Ты не думаешь, что делать сегодня — у тебя есть понятный следующий шаг." : isIntegration ? "Ты не подбираешь нагрузку наугад — каждый следующий шаг связан с твоим результатом и восстановлением." : "Ты развиваешь силу и мощность по плану, сохраняя движение, энергию и восстановление."}</p>}
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
