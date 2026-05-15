import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getPerformanceData } from "@/services/user-dashboard/getPerformanceData";

import PerformanceCharts from "@/components/dashboard/user/performance/PerformanceCharts";

import styles from "./page.module.css";

export default async function PerformancePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { stats, chart } = await getPerformanceData(user.id);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Player Performance</h1>

        <p>Analytics, evaluations and progression insights</p>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span>Average Score</span>

          <strong>{stats.averageScore}</strong>
        </div>

        <div className={styles.card}>
          <span>Best Score</span>

          <strong>{stats.bestScore}</strong>
        </div>

        <div className={styles.card}>
          <span>Evaluations</span>

          <strong>{stats.totalEvaluations}</strong>
        </div>

        <div className={styles.card}>
          <span>Attendance Rate</span>

          <strong>{stats.attendanceRate}%</strong>
        </div>
      </div>

      <PerformanceCharts chart={chart} />

      <div className={styles.bottom}>
        <div className={styles.box}>
          <h2>Strength Analysis</h2>

          <ul>
            <li>Shooting Accuracy</li>

            <li>Defensive Skills</li>

            <li>Passing Ability</li>

            <li>Team Communication</li>
          </ul>
        </div>

        <div className={styles.box}>
          <h2>Recommendations</h2>

          <p>
            Maintain attendance, increase training consistency and improve
            evaluation scores to maximize player growth.
          </p>
        </div>
      </div>
    </div>
  );
}
