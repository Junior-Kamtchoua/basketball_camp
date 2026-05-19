// services/teams/assignPlayerToTeam.ts

import pool from "@/lib/db";

interface AssignPlayerToTeamResponse {
  success: boolean;
}

export async function assignPlayerToTeam(
  playerId: string,
  teamId: string,
): Promise<AssignPlayerToTeamResponse> {
  const teamQuery = await pool.query(
    `
      SELECT id
      FROM teams
      WHERE id = $1
      LIMIT 1
    `,
    [teamId],
  );

  if (!teamQuery.rows[0]) {
    throw new Error("Team not found");
  }

  const playerQuery = await pool.query(
    `
      SELECT id
      FROM players
      WHERE id = $1
      LIMIT 1
    `,
    [playerId],
  );

  if (!playerQuery.rows[0]) {
    throw new Error("Player not found");
  }

  await pool.query(
    `
      UPDATE players
      SET team_id = $1
      WHERE id = $2
    `,
    [teamId, playerId],
  );

  return {
    success: true,
  };
}
