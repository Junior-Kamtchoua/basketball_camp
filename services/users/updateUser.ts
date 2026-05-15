import pool from "@/lib/db";

interface Props {
  id: string;

  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export async function updateUser({
  id,
  first_name,
  last_name,
  email,
  role,
}: Props) {
  const query = `
    UPDATE users
    SET
      first_name = $1,
      last_name = $2,
      email = $3,
      role = $4,
      updated_at = NOW()
    WHERE id = $5
    RETURNING
      id,
      first_name,
      last_name,
      email,
      role
  `;

  const values = [first_name, last_name, email, role, id];

  const result = await pool.query(query, values);

  return result.rows[0];
}
