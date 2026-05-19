// services/teams/createTeam.ts

import pool from "@/lib/db";

import { Team } from "@/types/team";

interface CreateTeamInput {
  name: string;
  age_group?: string;
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

export async function createTeam(input: CreateTeamInput): Promise<Team> {
  const query = `
    INSERT INTO teams (
      name,
      age_group,
      win_rate
    )
    VALUES (
      $1,
      $2,
      0
    )
    RETURNING *
  `;

  const values = [input.name, input.age_group || null];

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
