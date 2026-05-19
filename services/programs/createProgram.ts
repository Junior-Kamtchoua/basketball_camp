// services/programs/createProgram.ts

import pool from "@/lib/db";

interface CreateProgramInput {
  title: string;
  description?: string;
  price: number;
  duration_weeks: number;
  max_players: number;
}

export async function createProgram(input: CreateProgramInput) {
  const query = `
    INSERT INTO programs (
      title,
      description,
      price,
      duration_weeks,
      max_players,
      current_players,
      is_active
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      0,
      true
    )
    RETURNING *
  `;

  const values = [
    input.title,
    input.description || null,
    input.price,
    input.duration_weeks,
    input.max_players,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}
