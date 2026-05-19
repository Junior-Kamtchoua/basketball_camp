// services/teams/deleteTeam.ts

import pool from "@/lib/db";

interface DeleteTeamResponse {
  success: boolean;
}

export async function deleteTeam(teamId: string): Promise<DeleteTeamResponse> {
  await pool.query(
    `
      UPDATE players
      SET team_id = NULL
      WHERE team_id = $1
    `,
    [teamId],
  );

  await pool.query(
    `
      DELETE FROM teams
      WHERE id = $1
    `,
    [teamId],
  );

  return {
    success: true,
  };
}
