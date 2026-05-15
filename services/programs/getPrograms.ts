import pool from "@/lib/db";

import { Program } from "@/types/program";

export async function getPrograms(): Promise<Program[]> {
  const query = `
    SELECT
      id,
      title,
      description,
      price,
      duration_weeks,
      created_at

    FROM programs

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
