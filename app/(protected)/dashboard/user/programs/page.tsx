import { redirect } from "next/navigation";

import { BookOpen, Clock3, DollarSign, Trophy } from "lucide-react";

import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  getUserPrograms,
  UserProgram,
} from "@/services/user-dashboard/getUserPrograms";

import { getAvailablePrograms } from "@/services/programs/getAvailablePrograms";

import JoinProgramButton from "@/components/dashboard/user/programs/JoinProgramButton";

import styles from "./page.module.css";

export default async function ProgramsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  /*
    GET USER PROGRAMS
  */

  const userPrograms = await getUserPrograms(user.id);

  /*
    SPLIT PROGRAMS
  */

  const activePrograms = userPrograms.filter(
    (program) => program.application_status === "approved",
  );

  const pendingPrograms = userPrograms.filter(
    (program) => program.application_status === "pending",
  );

  /*
    AVAILABLE PROGRAMS
  */

  const availableProgramsRaw = await getAvailablePrograms();

  const joinedProgramIds = new Set(userPrograms.map((program) => program.id));

  const availablePrograms = availableProgramsRaw.filter(
    (program) => !joinedProgramIds.has(program.id),
  );

  /*
    STATS
  */

  const totalPrograms = activePrograms.length;

  const totalSpent = activePrograms.reduce(
    (acc, program) => acc + Number(program.price),
    0,
  );

  const totalWeeks = activePrograms.reduce(
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

      {/* AVAILABLE PROGRAMS */}

      <div className={styles.availableSection}>
        <div className={styles.availableTop}>
          <h2>Available Programs</h2>

          <p>
            Join basketball training programs created by the academy
            administration.
          </p>
        </div>

        <div className={styles.grid}>
          {availablePrograms.map((program) => {
            const spotsLeft = program.max_players - program.current_players;

            const isFull = spotsLeft <= 0;

            return (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.programTop}>
                  <span className={styles.badge}>
                    {isFull ? "FULL" : `${spotsLeft} spots left`}
                  </span>
                </div>

                <h2>{program.title}</h2>

                <p>
                  {program.description || "Elite basketball training program."}
                </p>

                <div className={styles.programStats}>
                  <div>
                    <span>Price</span>

                    <strong>${program.price}</strong>
                  </div>

                  <div>
                    <span>Duration</span>

                    <strong>{program.duration_weeks} weeks</strong>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressTop}>
                    <span>Players</span>

                    <span>
                      {program.current_players}/{program.max_players}
                    </span>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${
                          (program.current_players / program.max_players) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <JoinProgramButton programId={program.id} disabled={isFull} />
              </div>
            );
          })}
        </div>
      </div>

      {/* PENDING PROGRAMS */}

      {pendingPrograms.length > 0 && (
        <div className={styles.availableSection}>
          <div className={styles.availableTop}>
            <h2>Pending Applications</h2>

            <p>Waiting for academy approval and payment validation.</p>
          </div>

          <div className={styles.grid}>
            {pendingPrograms.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.programTop}>
                  <span className={styles.badge}>PENDING</span>
                </div>

                <h2>{program.title}</h2>

                <p>{program.description || "Waiting for admin approval."}</p>

                <div className={styles.programStats}>
                  <div>
                    <span>Price</span>

                    <strong>${program.price}</strong>
                  </div>

                  <div>
                    <span>Duration</span>

                    <strong>{program.duration_weeks} weeks</strong>
                  </div>
                </div>

                <button className={styles.button} disabled>
                  Awaiting Approval
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE PROGRAMS */}

      {activePrograms.length === 0 ? (
        <div className={styles.empty}>
          <h2>No Active Programs Yet</h2>

          <p>You are not enrolled in any approved program yet.</p>
        </div>
      ) : (
        <div className={styles.availableSection}>
          <div className={styles.availableTop}>
            <h2>Active Programs</h2>

            <p>Approved programs you are officially enrolled in.</p>
          </div>

          <div className={styles.grid}>
            {activePrograms.map((program) => (
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
        </div>
      )}
    </div>
  );
}
