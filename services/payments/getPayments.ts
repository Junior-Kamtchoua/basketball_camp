import pool from "@/lib/db";

import { Payment } from "@/types/payment";

export async function getPayments(): Promise<Payment[]> {
  const query = `
    SELECT
      payments.id,

      payments.player_program_id,

      payments.amount,

      payments.status,

      payments.payment_method,

      payments.payment_proof_url,

      payments.transaction_id,

      payments.created_at,

      payments.paid_at,

      users.first_name ||
      ' ' ||
      users.last_name
        AS player_name,

      users.email
        AS player_email,

      programs.title
        AS program_title

    FROM payments

    INNER JOIN players
      ON players.id =
      payments.player_id

    INNER JOIN users
      ON users.id =
      players.user_id

    LEFT JOIN player_programs
      ON player_programs.id =
      payments.player_program_id

    LEFT JOIN programs
      ON programs.id =
      player_programs.program_id

    ORDER BY payments.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows as Payment[];
}
