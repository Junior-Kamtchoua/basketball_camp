import pool from "@/lib/db";

export interface TeamMember {
  id: string;

  first_name: string;

  last_name: string;

  jersey_number: number | null;

  avatar_url: string | null;
}

export interface TeamData {
  id: string;

  name: string;

  logo_url: string | null;

  age_group: string | null;

  win_rate: number | null;

  coach_name: string | null;

  members: TeamMember[];
}

export async function getUserTeam(userId: string): Promise<TeamData | null> {
  const teamQuery = await pool.query(
    `
    SELECT
      teams.id,
      teams.name,
      teams.logo_url,
      teams.age_group,
      teams.win_rate,

      CONCAT(
        coaches.first_name,
        ' ',
        coaches.last_name
      ) AS coach_name

    FROM players

    INNER JOIN teams
      ON teams.id=players.team_id

    LEFT JOIN users coaches
      ON coaches.id=teams.coach_id

    WHERE players.user_id=$1

    LIMIT 1
`,
    [userId],
  );

  if (!teamQuery.rows.length) {
    return null;
  }

  const team = teamQuery.rows[0];

  const membersQuery = await pool.query(
    `
SELECT
users.id,
users.first_name,
users.last_name,
users.avatar_url,
players.jersey_number

FROM players

INNER JOIN users
ON users.id=players.user_id

WHERE players.team_id=$1
`,
    [team.id],
  );

  return {
    ...team,

    members: membersQuery.rows,
  };
}
