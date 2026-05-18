import pool from "@/lib/db";

export interface UserAttendance {
  id: string;

  title: string;

  start_time: string;

  status: string;
}

interface AttendanceRow {
  id: string;

  title: string;

  start_time: string;

  status: string;
}

export async function getUserAttendance(
  userId: string,
): Promise<UserAttendance[]> {
  /*
    GET PLAYER
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
    GET ATTENDANCE + EVENT INFO
  */

  const query = `
    SELECT
      attendance.id,

      attendance.status,

      events.title,

      events.start_time

    FROM attendance

    INNER JOIN events
      ON events.id =
      attendance.event_id

    WHERE attendance.player_id = $1

    ORDER BY events.start_time DESC
  `;

  const result = await pool.query(query, [playerId]);

  return result.rows.map(
    (item: AttendanceRow): UserAttendance => ({
      id: item.id,

      title: item.title,

      start_time: item.start_time,

      status: item.status,
    }),
  );
}
