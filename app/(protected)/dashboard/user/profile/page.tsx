import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserProfile } from "@/services/user-dashboard/getUserProfile";

import { getUserProfileStats } from "@/services/user-dashboard/getUserProfileStats";

import styles from "./page.module.css";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, stats] = await Promise.all([
    getUserProfile(user.id),

    getUserProfileStats(user.id),
  ]);

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.avatar}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" />
          ) : (
            <span>
              {profile.first_name.charAt(0)}
              {profile.last_name.charAt(0)}
            </span>
          )}
        </div>

        <div className={styles.heroContent}>
          <h1>
            {profile.first_name} {profile.last_name}
          </h1>

          <p>{profile.email}</p>

          <div className={styles.tags}>
            <span>{profile.team_name || "No Team"}</span>

            <span>Jersey #{profile.jersey_number || "-"}</span>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Attendance</h3>

          <strong>{stats.attendance_rate}%</strong>
        </div>

        <div className={styles.card}>
          <h3>Programs</h3>

          <strong>{stats.total_programs}</strong>
        </div>

        <div className={styles.card}>
          <h3>Payments</h3>

          <strong>${stats.total_payments}</strong>
        </div>

        <div className={styles.card}>
          <h3>Messages</h3>

          <strong>{stats.unread_messages}</strong>
        </div>

        <div className={styles.card}>
          <h3>Performance</h3>

          <strong>{stats.average_score}/100</strong>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h2>Player Information</h2>

          <div className={styles.infoList}>
            <div>
              <span>Gender</span>

              <strong>{profile.gender || "N/A"}</strong>
            </div>

            <div>
              <span>Height</span>

              <strong>
                {profile.height_cm ? `${profile.height_cm} cm` : "N/A"}
              </strong>
            </div>

            <div>
              <span>Weight</span>

              <strong>
                {profile.weight_kg ? `${profile.weight_kg} kg` : "N/A"}
              </strong>
            </div>

            <div>
              <span>Date of Birth</span>

              <strong>{profile.date_of_birth || "N/A"}</strong>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h2>Medical Notes</h2>

          <p>{profile.medical_notes || "No medical notes available."}</p>
        </div>
      </div>
    </div>
  );
}
