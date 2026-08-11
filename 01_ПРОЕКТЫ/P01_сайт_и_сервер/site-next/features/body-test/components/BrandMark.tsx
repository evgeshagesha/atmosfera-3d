import styles from "../test.module.css";

export function BrandMark() {
  return (
    <div className={styles.brand} aria-label="EG — Атмосфера 3D">
      <span className={styles.monogram}>EG</span>
      <span className={styles.brandLine} />
      <span className={styles.brandText}>АТМОСФЕРА 3D</span>
    </div>
  );
}
