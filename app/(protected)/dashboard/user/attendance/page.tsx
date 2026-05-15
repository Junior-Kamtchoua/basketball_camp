import { redirect } from "next/navigation";

import { CalendarCheck, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

import { getCurrentUser } from "@/lib/getCurrentUser";

import UserTable from "@/components/dashboard/user/tables/UserTable";

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
    attendance.length > 0
      ? Math.round((presentCount / attendance.length) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>Attendance Overview</h1>

          <p>
            Track your academy participation, training consistency and overall
            attendance performance across all sessions.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <div className={styles.iconBlue}>
            <CalendarCheck size={24} />
          </div>

          <div>
            <h3>{attendance.length}</h3>

            <p>Total Sessions</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconGreen}>
            <CheckCircle2 size={24} />
          </div>

          <div>
            <h3>{presentCount}</h3>

            <p>Present</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconRed}>
            <XCircle size={24} />
          </div>

          <div>
            <h3>{absentCount}</h3>

            <p>Absent</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconPurple}>
            <TrendingUp size={24} />
          </div>

          <div>
            <h3>{attendanceRate}%</h3>

            <p>Attendance Rate</p>
          </div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableTop}>
          <h2>Attendance History</h2>

          <span>{attendance.length} records</span>
        </div>

        <UserTable headers={["Date", "Status"]}>
          {attendance.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.attendance_date).toLocaleDateString()}</td>

              <td>
                <span
                  className={`${styles.badge} ${
                    item.status === "PRESENT"
                      ? styles.presentBadge
                      : styles.absentBadge
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </UserTable>
      </div>
    </div>
  );
}
