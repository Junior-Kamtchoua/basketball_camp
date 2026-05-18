import pool from "@/lib/db";

import { Payment } from "@/types/payment";

export async function getUserPayments(userId: string): Promise<Payment[]> {
  /*
    GET PLAYER ID
  */

  const playerQuery = await pool.query(
    `
      SELECT id

      FROM players

      WHERE user_id = $1

      LIMIT 1
    `,
    [userId],
  );

  const player = playerQuery.rows[0] as
    | {
        id: string;
      }
    | undefined;

  /*
    NO PLAYER
  */

  if (!player) {
    return [];
  }

  /*
    GET PAYMENTS
  */

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

      programs.title
        AS program_title

    FROM payments

    LEFT JOIN player_programs
      ON player_programs.id =
      payments.player_program_id

    LEFT JOIN programs
      ON programs.id =
      player_programs.program_id

    WHERE payments.player_id = $1

    ORDER BY payments.created_at DESC
  `;

  const result = await pool.query(query, [player.id]);

  return result.rows as Payment[];
}
