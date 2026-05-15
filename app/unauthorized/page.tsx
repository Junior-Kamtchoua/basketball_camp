import styles from "./page.module.css";

export default function UnauthorizedPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>403</h1>

        <h2>Unauthorized Access</h2>

        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  );
}
