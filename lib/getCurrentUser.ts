import { cookies } from "next/headers";

import { verifyToken, JwtPayload } from "./auth";
import pool from "./db";

interface CurrentUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "ADMIN" | "USER";
  avatar_url?: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }

  const payload = decoded as JwtPayload;

  const query = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      avatar_url
    FROM users
    WHERE id = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [payload.userId]);

  return result.rows[0] || null;
}
