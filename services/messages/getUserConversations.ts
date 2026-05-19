// services/messages/getUserConversations.ts

import pool from "@/lib/db";

export async function getUserConversations(userId: string) {
  const query = `
    SELECT DISTINCT ON (
      LEAST(sender_id, receiver_id),
      GREATEST(sender_id, receiver_id)
    )
      m.id,
      m.content,
      m.created_at,
      m.is_read,

      sender.id AS sender_id,

      sender.first_name ||
      ' ' ||
      sender.last_name AS sender_name,

      receiver.id AS receiver_id,

      receiver.first_name ||
      ' ' ||
      receiver.last_name AS receiver_name

    FROM messages m

    JOIN users sender
      ON sender.id = m.sender_id

    JOIN users receiver
      ON receiver.id = m.receiver_id

    WHERE sender_id = $1
    OR receiver_id = $1

    ORDER BY
      LEAST(sender_id, receiver_id),

      GREATEST(sender_id, receiver_id),

      created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}
