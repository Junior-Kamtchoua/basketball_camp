import { redirect } from "next/navigation";

import { BookOpen, Clock3, DollarSign, Trophy } from "lucide-react";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserPrograms } from "@/services/user-dashboard/getUserPrograms";

import styles from "./page.module.css";

export default async function ProgramsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const programs = await getUserPrograms(user.id);

  const totalPrograms = programs.length;

  const totalSpent = programs.reduce(
    (acc, program) => acc + Number(program.price),
    0,
  );

  const totalWeeks = programs.reduce(
    (acc, program) => acc + Number(program.duration_weeks || 0),
    0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>My Programs</h1>

          <p>Track your training programs, progress and academy activities.</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <div className={styles.iconBlue}>
            <BookOpen size={22} />
          </div>

          <div>
            <h3>{totalPrograms}</h3>

            <p>Active Programs</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconGreen}>
            <DollarSign size={22} />
          </div>

          <div>
            <h3>${totalSpent.toLocaleString()}</h3>

            <p>Total Investment</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconOrange}>
            <Clock3 size={22} />
          </div>

          <div>
            <h3>{totalWeeks}</h3>

            <p>Training Weeks</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconPurple}>
            <Trophy size={22} />
          </div>

          <div>
            <h3>92%</h3>

            <p>Performance Rate</p>
          </div>
        </div>
      </div>

      {programs.length === 0 ? (
        <div className={styles.empty}>
          <h2>No Programs Yet</h2>

          <p>You are not enrolled in any program yet.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {programs.map((program) => (
            <div key={program.id} className={styles.programCard}>
              <div className={styles.programTop}>
                <span className={styles.badge}>ACTIVE</span>
              </div>

              <h2>{program.title}</h2>

              <p>
                {program.description ||
                  "Elite basketball training program designed to improve performance and player development."}
              </p>

              <div className={styles.programStats}>
                <div>
                  <span>Price</span>

                  <strong>${program.price}</strong>
                </div>

                <div>
                  <span>Duration</span>

                  <strong>{program.duration_weeks || 0} weeks</strong>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressTop}>
                  <span>Progress</span>

                  <span>72%</span>
                </div>

                <div className={styles.progressBar}>
                  <div className={styles.progressFill} />
                </div>
              </div>

              <button className={styles.button}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
