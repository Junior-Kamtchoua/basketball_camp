"use client";

import {
  FaMoneyBillWave,
  FaUsers,
  FaBasketballBall,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";

import { useAutoRefresh } from "@/hooks/useAutoRefresh";

import { ActivityLog } from "@/types/analytics";

import styles from "./ActivityLogs.module.css";

interface Props {
  logs: ActivityLog[];
}

export default function ActivityLogs({ logs }: Props) {
  /*
    AUTO REFRESH
  */

  useAutoRefresh({
    interval: 10000,
  });

  /*
    ICONS
  */

  function getIcon(type: string) {
    switch (type) {
      case "PAYMENT":
        return <FaMoneyBillWave />;

      case "TEAM":
        return <FaBasketballBall />;

      case "USER":
        return <FaUsers />;

      case "EVENT":
        return <FaCalendarAlt />;

      default:
        return <FaBell />;
    }
  }

  /*
    BADGE COLORS
  */

  function getBadgeClass(type: string) {
    switch (type) {
      case "PAYMENT":
        return styles.payment;

      case "TEAM":
        return styles.team;

      case "USER":
        return styles.user;

      case "EVENT":
        return styles.event;

      default:
        return styles.default;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>LIVE PLATFORM ACTIVITY</span>

          <h2>Activity Timeline</h2>

          <p>Monitor payments, teams, events and user actions in real time.</p>
        </div>
      </div>

      <div className={styles.logs}>
        {logs.length === 0 ? (
          <div className={styles.empty}>No activity found</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={styles.log}>
              <div className={styles.left}>
                <div className={`${styles.icon} ${getBadgeClass(log.type)}`}>
                  {getIcon(log.type)}
                </div>

                <div className={styles.content}>
                  <div className={styles.action}>{log.action}</div>

                  <div className={styles.meta}>
                    <span
                      className={`${styles.type} ${getBadgeClass(log.type)}`}
                    >
                      {log.type}
                    </span>

                    <span className={styles.date}>
                      {new Date(log.created_at)
                        .toISOString()
                        .replace("T", " ")
                        .slice(0, 19)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.line} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
