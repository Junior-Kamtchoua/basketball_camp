import pool from "@/lib/db";

export interface AuditLog {
  id: string;

  action: string;

  created_at: string;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const query = `
    SELECT
      id,
      message AS action,
      created_at

    FROM notifications

    ORDER BY created_at DESC

    LIMIT 30
  `;

  const result = await pool.query(query);

  return result.rows;
}
