import {
  FaMoneyBillWave,
  FaUsers,
  FaBasketballBall,
  FaCalendarAlt,
} from "react-icons/fa";

import { getReportsStats } from "@/services/reports/getReportsStats";

import styles from "./page.module.css";

export default async function ReportsPage() {
  const stats = await getReportsStats();

  const reports = [
    {
      title: "Revenue Report",

      value: `$${stats.totalRevenue}`,

      description: "Monthly revenue analytics and financial growth.",

      icon: FaMoneyBillWave,
    },

    {
      title: "Users Report",

      value: stats.totalUsers,

      description: "Registered users and account activity.",

      icon: FaUsers,
    },

    {
      title: "Teams Report",

      value: stats.totalTeams,

      description: "Teams performance and activity tracking.",

      icon: FaBasketballBall,
    },

    {
      title: "Programs Report",

      value: stats.totalPrograms,

      description: "Programs scheduling and participation metrics.",

      icon: FaCalendarAlt,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Reports Center</h1>

          <p>Analytics, performance and financial insights</p>
        </div>
      </div>

      <div className={styles.grid}>
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div key={report.title} className={styles.card}>
              <div className={styles.icon}>
                <Icon />
              </div>

              <div className={styles.content}>
                <h2>{report.title}</h2>

                <h3>{report.value}</h3>

                <p>{report.description}</p>
              </div>

              <button className={styles.button}>View Report</button>
            </div>
          );
        })}
      </div>

      <div className={styles.analytics}>
        <div className={styles.analyticsCard}>
          <h2>Revenue Growth</h2>

          <p>
            Financial reports and income tracking connected to your payment
            system.
          </p>
        </div>

        <div className={styles.analyticsCard}>
          <h2>User Analytics</h2>

          <p>Analyze user growth, registrations and academy activity.</p>
        </div>

        <div className={styles.analyticsCard}>
          <h2>Performance Metrics</h2>

          <p>Monitor teams, programs and overall academy performance.</p>
        </div>
      </div>
    </div>
  );
}
