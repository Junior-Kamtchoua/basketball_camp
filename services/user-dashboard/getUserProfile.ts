import pool from "@/lib/db";

export interface UserProfile {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  avatar_url: string | null;

  created_at: string;

  team_name: string | null;

  team_logo: string | null;

  jersey_number: number | null;

  gender: string | null;

  height_cm: number | null;

  weight_kg: number | null;

  medical_notes: string | null;

  date_of_birth: string | null;
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  const query = `
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.email,
      users.avatar_url,
      users.created_at,

      teams.name AS team_name,
      teams.logo_url AS team_logo,

      players.jersey_number,
      players.gender,
      players.height_cm,
      players.weight_kg,
      players.medical_notes,
      players.date_of_birth

    FROM users

    LEFT JOIN players
      ON players.user_id = users.id

    LEFT JOIN teams
      ON teams.id = players.team_id

    WHERE users.id = $1

    LIMIT 1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0] || null;
}
