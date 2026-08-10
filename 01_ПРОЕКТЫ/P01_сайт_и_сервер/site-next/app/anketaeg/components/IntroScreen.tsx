import Image from "next/image";

import styles from "../anketaeg.module.css";
import BackgroundArt from "./BackgroundArt";

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

export default function IntroScreen({
  hasSaved,
  onStart,
  onResume,
  onRestart,
}: {
  hasSaved: boolean;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
}) {
  return (
    <main className={styles.introPage}>
      <BackgroundArt intro />
      <header className={styles.introHeader}>
        <Image
          src="/anketaeg/eg-mark.png"
          alt="EG"
          width={74}
          height={50}
          className={styles.headerLogo}
          priority
        />
        <span>ИССЛЕДОВАНИЕ · 2026</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span /> EG · ТЕЛО / ДВИЖЕНИЕ / ЖИЗНЬ
          </div>
          <h1>
            Исследование тела
            <br />
            <em>и образа жизни</em>
          </h1>
          <p className={styles.heroLead}>
            Мне важно понять, с чем вы реально сталкиваетесь в работе со своим
            телом.
          </p>
          <p className={styles.heroText}>
            Я прошёл путь от профессионального спорта и Высшей лиги до
            медицинского образования и работы с движением, биомеханикой и
            восстановлением. Но здесь мне важно услышать не только мнение
            специалиста — мне важно услышать вас.
          </p>
          <p className={styles.heroText}>
            Что беспокоит. Что уже пробовали. Какого результата хотите. Почему
            пока не получилось. Анкета займёт около 7 минут. После заполнения я
            бесплатно открою доступ к функциональному тесту тела.
          </p>

          <div className={styles.heroMeta}>
            <div>
              <strong>≈ 7</strong>
              <span>минут</span>
            </div>
            <div>
              <strong>1</strong>
              <span>персональный маршрут</span>
            </div>
            <div>
              <strong>тест</strong>
              <span>в подарок</span>
            </div>
          </div>

          {hasSaved ? (
            <div className={styles.heroActions}>
              <p className={styles.disclaimer} style={{ marginBottom: 0 }}>
                Вы уже начали исследование
              </p>
              <button type="button" className={styles.primaryButton} onClick={onResume}>
                Продолжить <ArrowIcon />
              </button>
              <button type="button" className={styles.secondaryButton} onClick={onRestart}>
                Начать заново
              </button>
            </div>
          ) : (
            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={onStart}>
                Начать исследование <ArrowIcon />
              </button>
            </div>
          )}

          <p className={styles.disclaimer}>
            Не является медицинской диагностикой. Большинство открытых вопросов
            можно пропустить.
          </p>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.portraitFrame}>
            <Image
              src="/anketaeg/eg-portrait.jpeg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 78vw, 38vw"
              className={styles.portrait}
            />
            <div className={styles.portraitShade} />
            <div className={styles.portraitTag}>
              <span>ЕВГЕНИЙ ГОШЕВ</span>
              <small>спорт · медицинское образование · движение</small>
            </div>
          </div>
          <div className={styles.orbitOne} />
          <div className={styles.orbitTwo} />
        </div>
      </section>

      <div className={styles.introFooter}>ДВИЖЕНИЕ · ДЫХАНИЕ · ДИСЦИПЛИНА</div>
    </main>
  );
}
