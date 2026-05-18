import pool from "@/lib/db";

import { Team } from "@/types/team";

interface UpdateTeamInput {
  id: string;

  name: string;

  age_group?: string;

  win_rate: number;
}

interface TeamRow {
  id: string;

  name: string;

  age_group: string | null;

  logo_url: string | null;

  coach_id: string | null;

  win_rate: number;

  created_at: string;
}

export async function updateTeam({
  id,
  name,
  age_group,
  win_rate,
}: UpdateTeamInput): Promise<Team> {
  const query = `
    UPDATE teams

    SET
      name = $1,
      age_group = $2,
      win_rate = $3

    WHERE id = $4

    RETURNING *
  `;

  const values = [name, age_group || null, win_rate, id];

  const result = await pool.query(query, values);

  const team = result.rows[0] as TeamRow;

  return {
    id: team.id,

    name: team.name,

    age_group: team.age_group || undefined,

    logo_url: team.logo_url || undefined,

    coach_id: team.coach_id || undefined,

    win_rate: team.win_rate,

    created_at: team.created_at,

    players_count: 0,
  };
}
