import pool from "@/lib/db";

import { Message } from "@/types/message";

export async function getUserMessages(userId: string): Promise<Message[]> {
  const query = `
    SELECT
      messages.id,
      messages.sender_id,
      messages.receiver_id,
      messages.content,
      messages.is_read,
      messages.created_at,

      sender.first_name || ' ' ||
      sender.last_name
      AS sender_name,

      receiver.first_name || ' ' ||
      receiver.last_name
      AS receiver_name

    FROM messages

    INNER JOIN users sender
      ON sender.id =
      messages.sender_id

    INNER JOIN users receiver
      ON receiver.id =
      messages.receiver_id

    WHERE
      messages.sender_id = $1
      OR
      messages.receiver_id = $1

    ORDER BY messages.created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}
