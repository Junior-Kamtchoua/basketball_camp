import { redirect } from "next/navigation";

import { CalendarDays, Clock3, MapPin, Trophy } from "lucide-react";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getPlayerSchedule } from "@/services/user-dashboard/getPlayerSchedule";

import styles from "./page.module.css";

export default async function SchedulePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const schedule = await getPlayerSchedule(user.id);

  const upcomingCount = schedule.filter(
    (item) => item.status === "UPCOMING",
  ).length;

  const completedCount = schedule.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const totalHours = schedule.reduce(
    (acc, item) => acc + item.duration_hours,
    0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <p className={styles.subtitle}>Training Schedule</p>

          <h1>Your Basketball Calendar</h1>

          <p className={styles.description}>
            Manage upcoming practices, events, tournaments and training
            sessions.
          </p>
        </div>

        <div className={styles.heroIcon}>
          <CalendarDays size={36} />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <span>Upcoming Sessions</span>

          <h2>{upcomingCount}</h2>
        </div>

        <div className={styles.card}>
          <span>Completed Sessions</span>

          <h2>{completedCount}</h2>
        </div>

        <div className={styles.card}>
          <span>Total Hours</span>

          <h2>{totalHours.toFixed(1)}h</h2>
        </div>

        <div className={styles.card}>
          <span>Total Events</span>

          <h2>{schedule.length}</h2>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className={styles.empty}>
          <h2>No Schedule Yet</h2>

          <p>No upcoming training sessions found.</p>
        </div>
      ) : (
        <div className={styles.timeline}>
          {schedule.map((item) => (
            <div key={item.id} className={styles.eventCard}>
              <div className={styles.left}>
                <div
                  className={`${styles.badge} ${
                    styles[item.status.toLowerCase()]
                  }`}
                >
                  {item.status}
                </div>

                <h2>{item.title}</h2>

                <p>
                  {item.description || "Basketball academy training session."}
                </p>

                <div className={styles.meta}>
                  <div>
                    <Clock3 size={16} />

                    <span>{new Date(item.start_time).toLocaleString()}</span>
                  </div>

                  <div>
                    <MapPin size={16} />

                    <span>{item.location || "No location"}</span>
                  </div>

                  <div>
                    <Trophy size={16} />

                    <span>{item.team_name || "No team"}</span>
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <h3>{item.duration_hours}h</h3>

                <small>Coach {item.coach_name || "Unknown"}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
