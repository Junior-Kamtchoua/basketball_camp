import pool from "@/lib/db";

export interface UserSettingsData {
  first_name: string;

  last_name: string;

  email: string;

  phone: string | null;

  avatar_url: string | null;

  created_at: string;

  last_login: string | null;

  is_verified: boolean;

  account_status: string;
}

export async function getUserSettingsData(
  userId: string,
): Promise<UserSettingsData | null> {
  const query = `
    SELECT
      first_name,
      last_name,
      email,
      phone,
      avatar_url,
      created_at,
      last_login,
      is_verified,
      account_status

    FROM users

    WHERE id=$1

    LIMIT 1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0] || null;
}
