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
        <span>ПЕРСОНАЛЬНАЯ АНКЕТА · 2026</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span /> ЕВГЕНИЙ ГОШЕВ · ПРОФЕССИОНАЛЬНЫЙ СПОРТСМЕН · ФИЗИЧЕСКИЙ ТЕРАПЕВТ
          </div>
          <h1>
            Родненькие,
            <br />
            <em>хочу понять, что нужно именно вам</em>
          </h1>
          <p className={styles.heroLead}>
            Расскажите немного о себе и о том результате, к которому хотите
            прийти.
          </p>
          <p className={styles.heroText}>
            Я прошёл путь от профессионального спорта и Высшей лиги до
            медицинского образования и работы с биомеханикой, восстановлением и
            людьми у себя в студии.{" "}
            <a
              className={styles.wikiLink}
              href="https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%88%D0%B5%D0%B2%2C_%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87"
              target="_blank"
              rel="noopener noreferrer"
            >
              (Обо мне на Википедии)
            </a>
          </p>
          <p className={`${styles.heroText} ${styles.heroEmphasis}`}>
            Но сейчас мне безумно важно услышать ваше мнение.
          </p>
          <ul className={styles.heroQuestions}>
            <li>Что вас беспокоит?</li>
            <li>Что вы уже пробовали?</li>
            <li>Какого результата хотите достичь?</li>
            <li>Что вам действительно нужно?</li>
            <li>И почему, как вам кажется, пока не получилось прийти к этому результату?</li>
          </ul>
          <p className={styles.heroText}>
            Анкета займёт <strong>около 7 минут</strong>.
          </p>
          <p className={styles.heroText}>
            После заполнения я <strong>бесплатно открою доступ</strong> к моему
            функциональному тесту. После него вы получите{" "}
            <strong>персональный результат</strong> и понятный план дальнейших
            действий.
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
                Вы уже начали анкету
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
                Начать <ArrowIcon />
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
              <small>профессиональный спортсмен · физический терапевт</small>
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
