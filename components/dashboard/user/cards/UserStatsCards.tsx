import {
  FaClipboardCheck,
  FaBasketballBall,
  FaMoneyBill,
  FaEnvelope,
} from "react-icons/fa";

import { FaArrowTrendUp } from "react-icons/fa6";

import { UserDashboardStats } from "@/types/user-dashboard";

import styles from "./UserStatsCards.module.css";

interface Props {
  stats: UserDashboardStats;
}

export default function UserStatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Attendance Rate",

      value: `${stats.attendanceRate}%`,

      subtitle: "Training presence",

      icon: FaClipboardCheck,
    },

    {
      title: "Programs",

      value: stats.totalPrograms,

      subtitle: "Active enrollments",

      icon: FaBasketballBall,
    },

    {
      title: "Payments",

      value: `$${stats.totalPayments}`,

      subtitle: "Completed fees",

      icon: FaMoneyBill,
    },

    {
      title: "Unread Messages",

      value: stats.unreadMessages,

      subtitle: "New conversations",

      icon: FaEnvelope,
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className={styles.card}>
            <div className={styles.top}>
              <div className={styles.icon}>
                <Icon size={22} />
              </div>

              <div className={styles.trend}>
                <FaArrowTrendUp />

                <span>Live</span>
              </div>
            </div>

            <div className={styles.content}>
              <h3>{card.title}</h3>

              <h2>{card.value}</h2>

              <p>{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
