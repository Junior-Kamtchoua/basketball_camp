import pool from "@/lib/db";

import { Payment } from "@/types/payment";

export async function getPayments(): Promise<Payment[]> {
  const query = `
    SELECT
      id,
      amount,
      status,
      payment_method,
      created_at

    FROM payments

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
}
