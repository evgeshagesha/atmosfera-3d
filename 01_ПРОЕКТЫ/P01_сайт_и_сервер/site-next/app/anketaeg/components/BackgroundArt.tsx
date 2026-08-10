import styles from "../anketaeg.module.css";

export default function BackgroundArt({ intro = false }: { intro?: boolean }) {
  return (
    <div
      className={`${styles.backgroundArt} ${intro ? styles.backgroundIntro : ""}`}
      aria-hidden="true"
    >
      <div className={styles.bgImage} />
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.fineGrid} />
      <svg
        className={styles.flowLines}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path d="M-120 185 C 210 30, 310 360, 690 156 S 1220 62, 1540 230" />
        <path d="M-90 360 C 270 180, 360 560, 760 330 S 1200 160, 1530 430" />
        <path d="M-120 720 C 250 500, 500 860, 860 645 S 1280 470, 1530 630" />
      </svg>
    </div>
  );
}
