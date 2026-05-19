// services/messages/sendMessage.ts

import pool from "@/lib/db";

interface Props {
  sender_id: string;
  receiver_id: string;
  content?: string;
  attachment_url?: string | null;
  audio_url?: string | null;
}

export async function sendMessage({
  sender_id,
  receiver_id,
  content,
  attachment_url,
  audio_url,
}: Props) {
  const query = `
    INSERT INTO messages (
      sender_id,
      receiver_id,
      content,
      attachment_url,
      audio_url,
      delivered
    )
    VALUES ($1, $2, $3, $4, $5, true)
    RETURNING
      id,
      sender_id,
      receiver_id,
      content,
      attachment_url,
      audio_url,
      is_read,
      delivered,
      created_at
  `;

  const values = [
    sender_id,
    receiver_id,
    content || "",
    attachment_url || null,
    audio_url || null,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}
