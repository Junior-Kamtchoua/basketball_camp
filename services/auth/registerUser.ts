import bcrypt from "bcryptjs";

import pool from "@/lib/db";

interface RegisterUserInput {
  first_name: string;

  last_name: string;

  email: string;

  password: string;
}

interface RegisteredUser {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  role: string;
}

export async function registerUser({
  first_name,
  last_name,
  email,
  password,
}: RegisterUserInput): Promise<RegisteredUser> {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await pool.query(
    `
      SELECT id

      FROM users

      WHERE email = $1

      LIMIT 1
    `,
    [normalizedEmail],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  /*
    CREATE USER
  */

  const query = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      is_verified
    )

    VALUES (
      $1,
      $2,
      $3,
      $4,
      'USER',
      true,
      true
    )

    RETURNING
      id,
      first_name,
      last_name,
      email,
      role
  `;

  const values = [
    first_name.trim(),

    last_name.trim(),

    normalizedEmail,

    hashedPassword,
  ];

  const result = await pool.query(query, values);

  const user = result.rows[0];

  /*
    CREATE PLAYER PROFILE
  */

  await pool.query(
    `
      INSERT INTO players (
        user_id,
        joined_at
      )

      VALUES (
        $1,
        NOW()
      )
    `,
    [user.id],
  );

  return user;
}
