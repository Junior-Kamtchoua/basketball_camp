import bcrypt from "bcryptjs";

import pool from "@/lib/db";

interface CreateCoachInput {
  first_name: string;

  last_name: string;

  email: string;

  password: string;
}

export async function createCoach({
  first_name,
  last_name,
  email,
  password,
}: CreateCoachInput) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      role,
      must_change_password,
      temporary_password
    )

    VALUES (
      $1,
      $2,
      $3,
      $4,
      'COACH',
      true,
      true
    )

    RETURNING id
  `;

  const values = [first_name, last_name, email, hashedPassword];

  const result = await pool.query(query, values);

  return result.rows[0];
}
