import styles from "../test.module.css";

export function BrandMark() {
  return (
    <div className={styles.brand} aria-label="EG — Атмосфера 3D">
      <span className={styles.brandSymbol} aria-hidden="true" />
      <span className={styles.brandLine} />
      <span className={styles.brandText}>АТМОСФЕРА 3D</span>
    </div>
  );
}
