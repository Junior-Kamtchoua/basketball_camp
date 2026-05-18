import pool from "@/lib/db";

import { PlayerOption } from "@/types/player-option";

export async function getPlayersWithoutTeam(): Promise<PlayerOption[]> {
  const query = `
    SELECT
      players.id,

      users.first_name,

      users.last_name,

      users.email

    FROM players

    INNER JOIN users
      ON users.id =
      players.user_id

    WHERE players.team_id IS NULL

    ORDER BY users.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows as PlayerOption[];
}
