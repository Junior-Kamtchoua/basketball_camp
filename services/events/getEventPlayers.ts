import pool from "@/lib/db";

export interface EventPlayer {
  player_id: string;

  user_id: string;

  full_name: string;

  team_name: string | null;
}

interface EventPlayerRow {
  player_id: string;

  user_id: string;

  full_name: string;

  team_name: string | null;
}

export async function getEventPlayers(eventId: string): Promise<EventPlayer[]> {
  const query = `
    SELECT
      players.id
        AS player_id,

      users.id
        AS user_id,

      CONCAT(
        users.first_name,
        ' ',
        users.last_name
      ) AS full_name,

      teams.name
        AS team_name

    FROM events

    INNER JOIN teams
      ON teams.id =
      events.team_id

    INNER JOIN players
      ON players.team_id =
      teams.id

    INNER JOIN users
      ON users.id =
      players.user_id

    WHERE events.id = $1

    ORDER BY users.first_name ASC
  `;

  const result = await pool.query(query, [eventId]);

  return result.rows.map(
    (player: EventPlayerRow): EventPlayer => ({
      player_id: player.player_id,

      user_id: player.user_id,

      full_name: player.full_name,

      team_name: player.team_name,
    }),
  );
}
