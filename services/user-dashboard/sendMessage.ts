import pool from "@/lib/db";

interface SendMessageInput {
  sender_id: string;

  receiver_id: string;

  content: string;
}

export async function sendMessage({
  sender_id,
  receiver_id,
  content,
}: SendMessageInput) {
  const query = `
    INSERT INTO messages (
      sender_id,
      receiver_id,
      content
    )

    VALUES ($1, $2, $3)

    RETURNING id
  `;

  const values = [sender_id, receiver_id, content];

  const result = await pool.query(query, values);

  return result.rows[0];
}
