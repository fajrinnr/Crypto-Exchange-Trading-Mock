import styles from "./navbar.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <h1>
        Mock <span className={styles["exchange-text"]}>Exchange</span>
      </h1>
      <div className={styles["submenu-container"]}>
        <span>Trade</span>
        <span className={styles.active}>Markets</span>
        <span>Portfolio</span>
      </div>
    </div>
  );
}
