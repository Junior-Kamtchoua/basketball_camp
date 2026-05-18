import { IconType } from "react-icons";

import { FaArrowTrendUp, FaCircle } from "react-icons/fa6";

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
      <div className={styles.glow} />

      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.live}>
            <FaCircle size={8} />

            <span>LIVE</span>
          </div>

          <p className={styles.title}>{title}</p>

          <h2 className={styles.value}>{value}</h2>
        </div>

        <div className={styles.icon}>
          <Icon size={24} />
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.trend}>
          <FaArrowTrendUp size={14} />

          <span>Updated now</span>
        </div>
      </div>
    </div>
  );
}
