import pool from "@/lib/db";

import { UserNotification } from "@/types/user-dashboard";

interface NotificationRow {
  id: string;

  title: string;

  message: string;

  type: string;

  is_read: boolean;

  created_at: string;
}

export async function getUserNotifications(
  userId: string,
): Promise<UserNotification[]> {
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

  return result.rows.map(
    (notification: NotificationRow): UserNotification => ({
      id: notification.id,

      title: notification.title,

      message: notification.message,

      type: notification.type,

      is_read: notification.is_read,

      created_at: notification.created_at,
    }),
  );
}
