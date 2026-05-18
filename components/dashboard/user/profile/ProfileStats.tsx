import {
  FaChartLine,
  FaBasketballBall,
  FaMoneyBillWave,
  FaEnvelope,
  FaTrophy,
} from "react-icons/fa";

import { UserProfileStats } from "@/types/profile";

import styles from "./ProfileStats.module.css";

interface Props {
  stats: UserProfileStats;
}

export default function ProfileStats({ stats }: Props) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.iconBlue}>
          <FaChartLine />
        </div>

        <div>
          <h3>{stats.attendance_rate}%</h3>

          <p>Attendance</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconPurple}>
          <FaBasketballBall />
        </div>

        <div>
          <h3>{stats.total_programs}</h3>

          <p>Programs</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconGreen}>
          <FaMoneyBillWave />
        </div>

        <div>
          <h3>${stats.total_payments}</h3>

          <p>Payments</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconRed}>
          <FaEnvelope />
        </div>

        <div>
          <h3>{stats.unread_messages}</h3>

          <p>Messages</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconGold}>
          <FaTrophy />
        </div>

        <div>
          <h3>{stats.average_score}/100</h3>

          <p>Performance</p>
        </div>
      </div>
    </div>
  );
}
