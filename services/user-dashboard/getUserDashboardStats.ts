// services/user-dashboard/getUserDashboardStats.ts

import pool from "@/lib/db";

import { UserDashboardStats } from "@/types/user-dashboard";

export async function getUserDashboardStats(
  userId: string,
): Promise<UserDashboardStats> {
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

  if (!player) {
    return {
      attendanceRate: 0,
      totalPrograms: 0,
      totalPayments: 0,
      unreadMessages: 0,
    };
  }

  const playerId: string = player.id;

  const [attendanceQuery, programsQuery, paymentsQuery, messagesQuery] =
    await Promise.all([
      pool.query(
        `
        SELECT
          COALESCE(
            ROUND(
              AVG(
                CASE
                  WHEN status = 'PRESENT'
                  THEN 100
                  ELSE 0
                END
              )
            ),
            0
          )::int AS rate
        FROM attendance
        WHERE player_id = $1
      `,
        [playerId],
      ),

      pool.query(
        `
        SELECT COUNT(*)::int AS total
        FROM player_programs
        WHERE player_id = $1
      `,
        [playerId],
      ),

      pool.query(
        `
        SELECT
          COALESCE(
            SUM(amount),
            0
          )::float AS total
        FROM payments
        WHERE player_id = $1
      `,
        [playerId],
      ),

      pool.query(
        `
        SELECT COUNT(*)::int AS total
        FROM messages
        WHERE receiver_id = $1
        AND is_read = false
      `,
        [userId],
      ),
    ]);

  return {
    attendanceRate: attendanceQuery.rows[0].rate,

    totalPrograms: programsQuery.rows[0].total,

    totalPayments: paymentsQuery.rows[0].total,

    unreadMessages: messagesQuery.rows[0].total,
  };
}
