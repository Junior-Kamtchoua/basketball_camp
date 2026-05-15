import pool from "@/lib/db";

export async function getConversation(userA: string, userB: string) {
  const query = `
    SELECT
      m.*,

      sender.first_name || ' ' || sender.last_name
      AS sender_name,

      receiver.first_name || ' ' || receiver.last_name
      AS receiver_name

    FROM messages m

    JOIN users sender
    ON sender.id = m.sender_id

    JOIN users receiver
    ON receiver.id = m.receiver_id

    WHERE
      (
        sender_id = $1
        AND receiver_id = $2
      )

      OR

      (
        sender_id = $2
        AND receiver_id = $1
      )

    ORDER BY created_at ASC
  `;

  const result = await pool.query(query, [userA, userB]);

  return result.rows;
}
