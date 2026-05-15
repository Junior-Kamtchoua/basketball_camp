import pool from "@/lib/db";

interface Props {
  search?: string;
}

export async function getUsersTable({ search = "" }: Props) {
  const query = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      is_active,
      created_at,
      basketball_registration_form_url

    FROM users

    WHERE
      first_name ILIKE $1
      OR last_name ILIKE $1
      OR email ILIKE $1

    ORDER BY created_at DESC
  `;

  const values = [`%${search}%`];

  const result = await pool.query(query, values);

  return result.rows;
}
