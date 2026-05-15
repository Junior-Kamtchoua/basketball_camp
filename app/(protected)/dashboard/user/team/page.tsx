import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getPlayerTeam } from "@/services/user-dashboard/getPlayerTeam";

import styles from "./page.module.css";

export default async function TeamPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const team = await getPlayerTeam(user.id);

  if (!team) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyCard}>
          <h1>No Team Assigned</h1>

          <p>You are currently not assigned to any team.</p>

          <span>Contact an administrator or coach.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* HERO */}

      <div className={styles.hero}>
        <div>
          <p className={styles.badge}>PLAYER TEAM</p>

          <h1>{team.name}</h1>

          <p className={styles.subtitle}>Team overview and statistics</p>
        </div>

        {team.logo_url && (
          <img src={team.logo_url} alt={team.name} className={styles.logo} />
        )}
      </div>

      {/* STATS */}

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span>Age Group</span>

          <h2>{team.age_group || "N/A"}</h2>
        </div>

        <div className={styles.statCard}>
          <span>Win Rate</span>

          <h2>{team.win_rate || 0}%</h2>
        </div>

        <div className={styles.statCard}>
          <span>Status</span>

          <h2>Active</h2>
        </div>
      </div>

      {/* DETAILS */}

      <div className={styles.details}>
        <div className={styles.infoCard}>
          <h3>Team Information</h3>

          <div className={styles.infoRow}>
            <span>Team Name</span>

            <strong>{team.name}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>Age Group</span>

            <strong>{team.age_group || "N/A"}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>Performance</span>

            <strong>{team.win_rate || 0}%</strong>
          </div>
        </div>

        <div className={styles.performanceCard}>
          <h3>Performance Meter</h3>

          <div className={styles.progressContainer}>
            <div
              className={styles.progress}
              style={{
                width: `${team.win_rate || 0}%`,
              }}
            />
          </div>

          <span>{team.win_rate || 0}% success rate</span>
        </div>
      </div>
    </div>
  );
}
