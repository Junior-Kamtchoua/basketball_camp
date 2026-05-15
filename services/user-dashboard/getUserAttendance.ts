import pool from "@/lib/db";

export interface UserAttendance {
  id: string;

  attendance_date: string;

  status: string;
}

export async function getUserAttendance(
  userId: string,
): Promise<UserAttendance[]> {
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
   GET ATTENDANCE
  */

  const query = `
    SELECT
      id,

      marked_at AS attendance_date,

      status

    FROM attendance

    WHERE player_id = $1

    ORDER BY marked_at DESC
  `;

  const result = await pool.query(query, [playerId]);

  return result.rows as UserAttendance[];
}
