import pool from "@/lib/db";

import { ChatUser } from "@/types/chat";

export async function getChatUsers(): Promise<ChatUser[]> {
  const query = `
    SELECT
      id,
      first_name,
      last_name,
      avatar_url,

      true AS online

    FROM users

    WHERE role = 'ADMIN'

    ORDER BY first_name ASC
  `;

  const result = await pool.query(query);

  return result.rows;
}
