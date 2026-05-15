import { ReactNode } from "react";

import styles from "./DashboardWidget.module.css";

interface Props {
  title: string;

  children: ReactNode;
}

export default function DashboardWidget({ title, children }: Props) {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
