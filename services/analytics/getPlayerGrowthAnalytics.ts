import pool from "@/lib/db";

import { PlayerGrowthAnalytics } from "@/types/analytics";

export async function getPlayerGrowthAnalytics(): Promise<
  PlayerGrowthAnalytics[]
> {
  const query = `
    SELECT
      TO_CHAR(
        joined_at,
        'Mon'
      ) AS month,

      COUNT(*)::int AS players

    FROM players

    GROUP BY
      DATE_TRUNC(
        'month',
        joined_at
      ),
      month

    ORDER BY
      DATE_TRUNC(
        'month',
        joined_at
      )
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    month: row.month,

    players: Number(row.players),
  }));
}
