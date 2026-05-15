import pool from "@/lib/db";

export async function getAllTeams() {
  const query = `
    SELECT *
    FROM teams
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
