import pool from "@/lib/db";

export interface PlayerEvaluation {
  id: string;

  score: number;

  notes: string | null;

  created_at: string;
}

export async function getPlayerEvaluations(
  userId: string,
): Promise<PlayerEvaluation[]> {
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

  /*
   GET EVALUATIONS
  */

  const query = `
    SELECT
      id,

      score,

      notes,

      created_at

    FROM evaluations

    WHERE player_id = $1

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [player.id]);

  return result.rows;
}
