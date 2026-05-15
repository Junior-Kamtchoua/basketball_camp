import pool from "@/lib/db";

export async function deleteUser(id: string) {
  const query = `
    DELETE FROM users
    WHERE id = $1
  `;

  await pool.query(query, [id]);

  return true;
}
