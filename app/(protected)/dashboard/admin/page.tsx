import StatsCardsGrid from "@/components/dashboard/admin/cards/StatsCardsGrid";

import RevenueAnalyticsChart from "@/components/dashboard/admin/analytics/RevenueAnalyticsChart";

import PlayerGrowthChart from "@/components/dashboard/admin/analytics/PlayerGrowthChart";

import ActivityLogs from "@/components/dashboard/admin/activity/ActivityLogs";

import { getDashboardStats } from "@/services/dashboard/getDashboardStats";

import { getRevenueAnalytics } from "@/services/analytics/getRevenueAnalytics";

import { getPlayerGrowthAnalytics } from "@/services/analytics/getPlayerGrowthAnalytics";

import { getActivityLogs } from "@/services/analytics/getActivityLogs";

import styles from "./page.module.css";

export default async function AdminPage() {
  const [stats, revenueData, playerGrowthData, logs] = await Promise.all([
    getDashboardStats(),

    getRevenueAnalytics(),

    getPlayerGrowthAnalytics(),

    getActivityLogs(),
  ]);

  return (
    <div className={styles.container}>
      <StatsCardsGrid stats={stats} />

      <div className={styles.grid}>
        <RevenueAnalyticsChart data={revenueData} />

        <PlayerGrowthChart data={playerGrowthData} />
      </div>

      <ActivityLogs logs={logs} />
    </div>
  );
}
