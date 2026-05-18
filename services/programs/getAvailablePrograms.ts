import pool from "@/lib/db";

import { Program } from "@/types/program";

export async function getAvailablePrograms(): Promise<Program[]> {
  const query = `
    SELECT
      id,
      title,
      description,
      price,
      duration_weeks,
      max_players,
      current_players,
      image_url,
      is_active,
      created_at

    FROM programs

    WHERE is_active = true

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
