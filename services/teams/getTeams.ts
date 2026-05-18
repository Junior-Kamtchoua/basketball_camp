import pool from "@/lib/db";

import { Team } from "@/types/team";

interface TeamRow {
  id: string;

  name: string;

  age_group: string | null;

  logo_url: string | null;

  coach_id: string | null;

  win_rate: number;

  created_at: string;

  players_count: string;
}

export async function getTeams(): Promise<Team[]> {
  const query = `
    SELECT
      teams.id,

      teams.name,

      teams.age_group,

      teams.logo_url,

      teams.coach_id,

      teams.win_rate,

      teams.created_at,

      COUNT(players.id)
        AS players_count

    FROM teams

    LEFT JOIN players
      ON players.team_id =
      teams.id

    GROUP BY teams.id

    ORDER BY teams.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows.map(
    (team: TeamRow): Team => ({
      id: team.id,

      name: team.name,

      age_group: team.age_group || undefined,

      logo_url: team.logo_url || undefined,

      coach_id: team.coach_id || undefined,

      win_rate: team.win_rate,

      created_at: team.created_at,

      players_count: Number(team.players_count),
    }),
  );
}
