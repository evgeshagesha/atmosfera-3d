import Image from "next/image";

import styles from "../anketaeg.module.css";
import { ANKETA_EVENTS, trackAnketa } from "../lib/analytics";
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

const TEST_URL = process.env.NEXT_PUBLIC_EG_TEST_URL || "/testeg";

export default function FinalScreen() {
  return (
    <main className={styles.pageShell}>
      <BackgroundArt />
      <section className={styles.successWrap}>
        <div className={styles.successGlow} />
        <Image
          src="/anketaeg/eg-mark.png"
          alt="EG"
          width={92}
          height={62}
          className={styles.successLogo}
        />
        <div className={styles.unlockBadge}>ПОДАРОК ОТКРЫТ</div>
        <h1 className={styles.successTitle}>
          Спасибо.
          <br />
          Первый шаг сделан.
        </h1>
        <p className={styles.successText}>
          Вы уже сделали то, что большинство людей постоянно откладывает:
          остановились и посмотрели на состояние своего тела чуть внимательнее.
        </p>
        <p className={styles.successText}>
          Теперь предлагаю не гадать, насколько ваше тело действительно
          функционально.
        </p>
        <div className={styles.giftCard}>
          <span className={styles.giftIndex}>01</span>
          <div>
            <strong>Функциональный тест тела</strong>
            <p>5 коротких блоков · около 10 минут · персональный результат</p>
          </div>
        </div>
        <a
          href={TEST_URL}
          className={styles.primaryButton}
          onClick={() => trackAnketa(ANKETA_EVENTS.testClick, { url: TEST_URL })}
        >
          Начать тест <ArrowIcon />
        </a>
        <p className={styles.redirectText}>
          Тест уже доступен — переходите, когда будете готовы.
        </p>
      </section>
    </main>
  );
}
