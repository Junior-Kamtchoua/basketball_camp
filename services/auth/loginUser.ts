// services/auth/loginUser.ts

import pool from "@/lib/db";
import bcrypt from "bcryptjs";

interface LoginProps {
  email: string;
  password: string;
}

export interface LoginUserResult {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  must_change_password: boolean;
  temporary_password: boolean;
  last_login: string | null;
}

interface DatabaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  account_status: string;
  must_change_password: boolean;
  temporary_password: boolean;
  last_login: string | null;
}

export async function loginUser({
  email,
  password,
}: LoginProps): Promise<LoginUserResult> {
  const normalizedEmail = email.toLowerCase().trim();

  const query = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      account_status,
      must_change_password,
      temporary_password,
      last_login
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [normalizedEmail]);

  const user = result.rows[0] as DatabaseUser | undefined;

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.is_active) {
    throw new Error("Account disabled");
  }

  if (user.account_status === "SUSPENDED") {
    throw new Error("Account suspended");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  await pool.query(
    `
      UPDATE users
      SET last_login = NOW()
      WHERE id = $1
    `,
    [user.id],
  );

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    must_change_password: user.must_change_password,
    temporary_password: user.temporary_password,
    last_login: user.last_login,
  };
}
