import pool from "@/lib/db";

export interface PerformanceStats {
  averageScore: number;

  bestScore: number;

  totalEvaluations: number;

  attendanceRate: number;
}

export interface PerformanceChart {
  date: string;

  score: number;
}

export async function getPerformanceData(userId: string): Promise<{
  stats: PerformanceStats;
  chart: PerformanceChart[];
}> {
  const playerResult = await pool.query(
    `
      SELECT id
      FROM players
      WHERE user_id=$1
      LIMIT 1
    `,
    [userId],
  );

  const playerId: string | undefined = playerResult.rows[0]?.id;

  if (!playerId) {
    return {
      stats: {
        averageScore: 0,
        bestScore: 0,
        totalEvaluations: 0,
        attendanceRate: 0,
      },
      chart: [],
    };
  }

  const [evaluationQuery, attendanceQuery] = await Promise.all([
    pool.query(
      `
        SELECT
          COALESCE(
            ROUND(AVG(score)),
            0
          )::int AS average_score,

          COALESCE(
            MAX(score),
            0
          )::int AS best_score,

          COUNT(*)::int AS total

        FROM evaluations

        WHERE player_id=$1
      `,
      [playerId],
    ),

    pool.query(
      `
        SELECT
          COALESCE(
            ROUND(
              AVG(
                CASE
                  WHEN status='PRESENT'
                  THEN 100
                  ELSE 0
                END
              )
            ),
            0
          )::int AS attendance_rate

        FROM attendance

        WHERE player_id=$1
      `,
      [playerId],
    ),
  ]);

  const chartQuery = await pool.query(
    `
      SELECT
        TO_CHAR(
          created_at,
          'Mon'
        ) AS date,

        score

      FROM evaluations

      WHERE player_id=$1

      ORDER BY created_at ASC
    `,
    [playerId],
  );

  return {
    stats: {
      averageScore: evaluationQuery.rows[0].average_score,

      bestScore: evaluationQuery.rows[0].best_score,

      totalEvaluations: evaluationQuery.rows[0].total,

      attendanceRate: attendanceQuery.rows[0].attendance_rate,
    },

    chart: chartQuery.rows,
  };
}
