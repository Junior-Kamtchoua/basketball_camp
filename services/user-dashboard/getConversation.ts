import pool from "@/lib/db";

import { ChatMessage } from "@/types/chat";

export async function getConversation(
  currentUserId: string,
  targetUserId: string,
): Promise<ChatMessage[]> {
  const query = `
    SELECT
      id,
      sender_id,
      receiver_id,
      content,
      attachment_url,
      is_read,
      delivered,
      created_at

    FROM messages

    WHERE
      (
        sender_id = $1
        AND
        receiver_id = $2
      )

      OR

      (
        sender_id = $2
        AND
        receiver_id = $1
      )

    ORDER BY created_at ASC
  `;

  const result = await pool.query(query, [currentUserId, targetUserId]);

  return result.rows;
}
