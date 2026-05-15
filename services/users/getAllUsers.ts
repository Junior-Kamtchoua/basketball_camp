import pool from "@/lib/db";

export async function getAllUsers() {
  const query = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      avatar_url,
      is_active,
      is_verified,
      created_at
    FROM users
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
