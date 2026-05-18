import pool from "@/lib/db";

import { Document } from "@/types/document";

export async function getAllDocuments(): Promise<Document[]> {
  const query = `
    SELECT
      user_documents.id,

      user_documents.user_id,

      user_documents.payment_id,

      user_documents.file_url,

      user_documents.document_type,

      user_documents.created_at,

      users.first_name ||
      ' ' ||
      users.last_name
        AS user_name,

      users.email
        AS user_email

    FROM user_documents

    INNER JOIN users
      ON users.id =
      user_documents.user_id

    ORDER BY user_documents.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows as Document[];
}
