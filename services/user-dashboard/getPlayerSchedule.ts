import pool from "@/lib/db";

import { PlayerSchedule } from "@/types/user-dashboard";

interface ScheduleRow {
  id: string;

  title: string;

  description: string | null;

  location: string | null;

  start_time: string;

  end_time: string;

  coach_name: string | null;

  team_name: string | null;

  duration_hours: number;
}

export async function getPlayerSchedule(
  userId: string,
): Promise<PlayerSchedule[]> {
  /*
    GET PLAYER + TEAM
  */

  const playerQuery = await pool.query(
    `
      SELECT
        players.id,
        players.team_id

      FROM players

      WHERE players.user_id = $1

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

  /*
    NO TEAM
  */

  if (!player.team_id) {
    return [];
  }

  /*
    GET REAL SCHEDULE
  */

  const query = `
    SELECT
      events.id,

      events.title,

      events.description,

      events.location,

      events.start_time,

      events.end_time,

      teams.name AS team_name,

      CONCAT(
        users.first_name,
        ' ',
        users.last_name
      ) AS coach_name,

      ROUND(
        EXTRACT(
          EPOCH FROM (
            events.end_time - events.start_time
          )
        ) / 3600,
        1
      )::float AS duration_hours

    FROM events

    LEFT JOIN teams
      ON teams.id = events.team_id

    LEFT JOIN coaches
      ON coaches.id = teams.coach_id

    LEFT JOIN users
      ON users.id = coaches.user_id

    WHERE events.team_id = $1

    ORDER BY events.start_time ASC

    LIMIT 15
  `;

  const result = await pool.query(query, [player.team_id]);

  const now = new Date();

  return result.rows.map((event: ScheduleRow) => {
    const start = new Date(event.start_time);

    const end = new Date(event.end_time);

    let status: "UPCOMING" | "LIVE" | "COMPLETED" = "UPCOMING";

    if (now >= start && now <= end) {
      status = "LIVE";
    } else if (now > end) {
      status = "COMPLETED";
    }

    return {
      ...event,

      status,
    };
  });
}
