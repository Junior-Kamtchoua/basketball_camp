import pool from "@/lib/db";

interface Props {
  search?: string;
}

export async function getUsersTable({ search = "" }: Props) {
  const query = `
    SELECT
      users.id,

      users.first_name,

      users.last_name,

      users.email,

      users.role,

      users.is_active,

      users.created_at,

      users.basketball_registration_form_url,

      players.team_id,

      teams.name AS team_name,

      registration_forms.id AS registration_form_id,

      registration_forms.form_type,

      registration_forms.status AS registration_status,

      registration_forms.submitted_at

    FROM users

    LEFT JOIN players
      ON players.user_id = users.id

    LEFT JOIN teams
      ON teams.id = players.team_id

    LEFT JOIN registration_forms
      ON registration_forms.user_id = users.id

    WHERE
      users.first_name ILIKE $1
      OR users.last_name ILIKE $1
      OR users.email ILIKE $1

    ORDER BY users.created_at DESC
  `;

  const values = [`%${search}%`];

  const result = await pool.query(query, values);

  return result.rows;
}
