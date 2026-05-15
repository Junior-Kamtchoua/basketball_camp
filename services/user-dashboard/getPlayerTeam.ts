import pool from "@/lib/db";

export interface PlayerTeam {
  id: string;

  name: string;

  age_group: string;
  logo_url: string | null;
  win_rate: number;
}

export async function getPlayerTeam(
  userId: string,
): Promise<PlayerTeam | null> {
  const query = `
    SELECT
      teams.id,
      teams.name,
      teams.age_group,
      teams.win_rate

    FROM players

    INNER JOIN teams
      ON teams.id =
      players.team_id

    WHERE players.user_id = $1

    LIMIT 1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0] || null;
}
