import pool from "@/lib/db";

import { Team } from "@/types/team";

export async function getTeams(): Promise<Team[]> {
  const query = `
    SELECT
      id,
      name,
      age_group,
      logo_url,
      win_rate,
      created_at

    FROM teams

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
