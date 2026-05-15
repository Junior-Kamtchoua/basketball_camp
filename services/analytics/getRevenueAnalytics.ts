import pool from "@/lib/db";

import { RevenueAnalytics } from "@/types/analytics";

export async function getRevenueAnalytics(): Promise<RevenueAnalytics[]> {
  const query = `
    SELECT
      TO_CHAR(
        created_at,
        'Mon'
      ) AS month,

      COALESCE(
        SUM(amount),
        0
      )::float AS revenue

    FROM payments

    WHERE status = 'PAID'

    GROUP BY
      DATE_TRUNC(
        'month',
        created_at
      ),
      month

    ORDER BY
      DATE_TRUNC(
        'month',
        created_at
      )
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    month: row.month,

    revenue: Number(row.revenue),
  }));
}
