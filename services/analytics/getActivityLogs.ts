import pool from "@/lib/db";

import { ActivityLog } from "@/types/analytics";

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const query = `
    SELECT
      id,

      action,

      type,

      created_at

    FROM activity_logs

    ORDER BY created_at DESC

    LIMIT 12
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    id: row.id,

    action: row.action,

    type: row.type,

    created_at: row.created_at,
  }));
}
