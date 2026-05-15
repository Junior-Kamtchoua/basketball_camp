import { IconType } from "react-icons";

import styles from "./StatsCard.module.css";

interface Props {
  title: string;

  value: string | number;

  subtitle: string;

  icon: IconType;
}

export default function StatsCard({
  title,

  value,

  subtitle,

  icon: Icon,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>{title}</p>

          <h2 className={styles.value}>{value}</h2>
        </div>

        <div className={styles.icon}>
          <Icon size={24} />
        </div>
      </div>

      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
