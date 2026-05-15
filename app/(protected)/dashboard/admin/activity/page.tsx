import { FaChartLine, FaBell, FaUsers, FaBasketballBall } from "react-icons/fa";

import { getActivityLogs } from "@/services/analytics/getActivityLogs";

import styles from "./page.module.css";

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  const stats = [
    {
      title: "Recent Activities",

      value: logs.length,

      icon: FaChartLine,
    },

    {
      title: "Notifications",

      value: logs.length,

      icon: FaBell,
    },

    {
      title: "User Actions",

      value: logs.length,

      icon: FaUsers,
    },

    {
      title: "Team Updates",

      value: logs.length,

      icon: FaBasketballBall,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Activity Stream</h1>

          <p>Real-time platform activity and system events</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.title} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon />
              </div>

              <div>
                <h2>{stat.value}</h2>

                <p>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {logs.length === 0 ? (
        <div className={styles.empty}>
          <FaChartLine />

          <h2>No activity found</h2>

          <p>Platform activity will appear here.</p>
        </div>
      ) : (
        <div className={styles.timeline}>
          {logs.map((log) => (
            <div key={log.id} className={styles.activityCard}>
              <div className={styles.dot} />

              <div className={styles.content}>
                <h3>{log.action}</h3>

                <small>{new Date(log.created_at).toLocaleString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
