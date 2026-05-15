import pool from "@/lib/db";

import { ActivityLog } from "@/types/analytics";

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const query = `
    SELECT
      id,

      message AS action,

      created_at

    FROM notifications

    ORDER BY created_at DESC

    LIMIT 10
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    id: row.id,

    action: row.action,

    created_at: row.created_at,
  }));
}
