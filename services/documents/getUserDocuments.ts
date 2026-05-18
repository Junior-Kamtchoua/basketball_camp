import pool from "@/lib/db";

import { Document } from "@/types/document";

export async function getUserDocuments(userId: string): Promise<Document[]> {
  const query = `
    SELECT
      id,

      user_id,

      payment_id,

      file_url,

      document_type,

      created_at

    FROM user_documents

    WHERE user_id = $1

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows as Document[];
}
