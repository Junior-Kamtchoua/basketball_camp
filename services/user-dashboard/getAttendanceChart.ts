import pool from "@/lib/db";

import { AttendanceChartData } from "@/types/user-dashboard";

export async function getAttendanceChart(
  userId: string,
): Promise<AttendanceChartData[]> {
  /*
   GET PLAYER ID
  */

  const playerQuery = await pool.query(
    `
      SELECT id

      FROM players

      WHERE user_id = $1

      LIMIT 1
    `,
    [userId],
  );

  const player = playerQuery.rows[0];

  /*
   NO PLAYER
  */

  if (!player) {
    return [];
  }

  const playerId: string = player.id;

  /*
   ATTENDANCE ANALYTICS
  */

  const query = `
    SELECT
      TO_CHAR(
        marked_at,
        'Mon'
      ) AS month,

      COUNT(*) FILTER (
        WHERE status = 'PRESENT'
      )::int AS attendance

    FROM attendance

    WHERE player_id = $1

    GROUP BY month

    ORDER BY MIN(marked_at)
  `;

  const result = await pool.query(query, [playerId]);

  return result.rows as AttendanceChartData[];
}
