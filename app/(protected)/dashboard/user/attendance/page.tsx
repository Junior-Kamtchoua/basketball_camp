import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserAttendance } from "@/services/user-dashboard/getUserAttendance";

import styles from "./page.module.css";

export default async function AttendancePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const attendance = await getUserAttendance(user.id);

  const presentCount = attendance.filter(
    (item) => item.status === "PRESENT",
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "ABSENT",
  ).length;

  const attendanceRate =
    attendance.length === 0
      ? 0
      : Math.round((presentCount / attendance.length) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Attendance Dashboard</h1>

        <p>Track your training attendance and academy consistency.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h2>{attendanceRate}%</h2>

          <p>Attendance Rate</p>
        </div>

        <div className={styles.card}>
          <h2>{presentCount}</h2>

          <p>Present</p>
        </div>

        <div className={styles.card}>
          <h2>{absentCount}</h2>

          <p>Absent</p>
        </div>

        <div className={styles.card}>
          <h2>{attendance.length}</h2>

          <p>Total Sessions</p>
        </div>
      </div>

      <div className={styles.list}>
        {attendance.map((item) => (
          <div key={item.id} className={styles.eventCard}>
            <div>
              <h3>{item.title}</h3>

              <p>{new Date(item.start_time).toLocaleString()}</p>
            </div>

            <span
              className={`${styles.badge} ${
                item.status === "PRESENT" ? styles.present : styles.absent
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
