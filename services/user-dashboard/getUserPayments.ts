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

  const player = playerQuery.rows[0];

  /*
   NO PLAYER
  */

  if (!player) {
    return [];
  }

  const playerId: string = player.id;

  /*
   GET PAYMENTS
  */

  const query = `
    SELECT
      id,

      amount,

      status,

      payment_method,

      created_at

    FROM payments

    WHERE player_id = $1

    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [playerId]);

  return result.rows as Payment[];
}
