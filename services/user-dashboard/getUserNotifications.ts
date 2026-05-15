import pool from "@/lib/db";

import { Notification } from "@/types/notification";

export async function getUserNotifications(
  userId: string,
): Promise<Notification[]> {
  const query = `
    SELECT
      id,
      title,
      message,
      type,
      is_read,
      created_at

    FROM notifications

    WHERE user_id = $1

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}
