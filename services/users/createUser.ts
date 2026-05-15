import pool from "@/lib/db";

import bcrypt from "bcryptjs";

interface Props {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export async function createUser({
  first_name,
  last_name,
  email,
  password,
  role,
}: Props) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      first_name,
      last_name,
      email,
      role,
      is_active,
      is_verified,
      created_at
  `;

  const values = [first_name, last_name, email, hashedPassword, role];

  const result = await pool.query(query, values);

  return result.rows[0];
}
