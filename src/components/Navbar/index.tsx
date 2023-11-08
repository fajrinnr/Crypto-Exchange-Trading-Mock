import styles from "./navbar.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <h1>
        Pintu <span className={styles["exchange-text"]}>Exchange</span>
      </h1>
      <div className={styles["submenu-container"]}>
        <span>Trade</span>
        <span className={styles.active}>Markets</span>
        <span>Portfolio</span>
      </div>
    </div>
  );
}

// https://rapidapi.com/sparior/api/yahoo-finance15/
// https://iexcloud.io/docs/api/#iex-cloud-legacy-api-docs
// VCZNJE5PAIT2FO0B
