import pool from "@/lib/db";

import { Program } from "@/types/program";

export async function getUserPrograms(userId: string): Promise<Program[]> {
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
   NO PLAYER PROFILE
  */

  if (!player) {
    return [];
  }

  const playerId: string = player.id;

  /*
   GET USER PROGRAMS
  */

  const query = `
    SELECT
      programs.id,

      programs.title,

      programs.description,

      programs.price,

      programs.duration_weeks,

      programs.created_at

    FROM player_programs

    INNER JOIN programs
      ON programs.id =
      player_programs.program_id

    WHERE player_programs.player_id = $1
  `;

  const result = await pool.query(query, [playerId]);

  return result.rows as Program[];
}
