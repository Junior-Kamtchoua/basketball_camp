import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import UserStatsCards from "@/components/dashboard/user/cards/UserStatsCards";

import AttendanceChart from "@/components/dashboard/user/analytics/AttendanceChart";

import UpcomingEvents from "@/components/dashboard/user/schedule/UpcomingEvents";

import { getUserDashboardStats } from "@/services/user-dashboard/getUserDashboardStats";

import { getAttendanceChart } from "@/services/user-dashboard/getAttendanceChart";

import { getUpcomingEvents } from "@/services/user-dashboard/getUpcomingEvents";

import styles from "./page.module.css";

export default async function UserPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [stats, attendanceData, upcomingEvents] = await Promise.all([
    getUserDashboardStats(user.id),

    getAttendanceChart(user.id),

    getUpcomingEvents(),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Welcome back, {user.first_name}</h1>

        <p>Track your basketball journey and stay connected.</p>
      </div>

      <UserStatsCards stats={stats} />

      <div className={styles.grid}>
        <AttendanceChart data={attendanceData} />

        <UpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
}
