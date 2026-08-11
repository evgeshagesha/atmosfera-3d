import styles from "../test.module.css";

export function Progress({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className={styles.progressWrap} aria-label={`Прогресс: ${percent}%`}>
      <div className={styles.progressMeta}>
        <span>ФУНКЦИОНАЛЬНАЯ ДИАГНОСТИКА</span>
        <span>{String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
      <div className={styles.progressTrack}><span style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
