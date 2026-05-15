import pool from "@/lib/db";
import { Notification } from "@/types/notification";

export async function getNotifications(): Promise<Notification[]> {
  const query = `
    SELECT
      id,
      title,
      message,
      type,
      is_read,
      created_at
    FROM notifications
    ORDER BY created_at DESC
    LIMIT 20
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    message: row.message,
    type: row.type,
    is_read: row.is_read,
    created_at: row.created_at,
  }));
}
