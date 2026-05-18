import { NextRequest } from "next/server";

import pool from "@/lib/db";

import { createNotification } from "@/services/notifications/createNotification";

import { createActivityLog } from "@/services/audit/createActivityLog";

interface Params {
  params: Promise<{
    paymentId: string;
  }>;
}

interface PaymentRow {
  id: string;

  player_id: string;

  amount: number;

  first_name: string;

  last_name: string;

  user_id: string;
}

export async function POST(
  request: NextRequest,

  { params }: Params,
) {
  try {
    /*
      GET PARAMS
    */

    const { paymentId } = await params;

    /*
      GET PAYMENT
    */

    const paymentQuery = await pool.query<PaymentRow>(
      `
        SELECT
          payments.id,

          payments.player_id,

          payments.amount,

          users.first_name,

          users.last_name,

          users.id AS user_id

        FROM payments

        INNER JOIN players
          ON players.id =
          payments.player_id

        INNER JOIN users
          ON users.id =
          players.user_id

        WHERE payments.id = $1

        LIMIT 1
      `,
      [paymentId],
    );

    const payment = paymentQuery.rows[0];

    /*
      PAYMENT NOT FOUND
    */

    if (!payment) {
      return Response.json(
        {
          error: "Payment not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
      UPDATE PAYMENT
    */

    await pool.query(
      `
        UPDATE payments

        SET
          status = 'PAID',

          paid_at = NOW()

        WHERE id = $1
      `,
      [paymentId],
    );

    /*
      CREATE NOTIFICATION
    */
    console.log("BEFORE NOTIFICATION");

    await createNotification({
      userId: payment.user_id,

      title: "Payment Approved",

      message: `Your payment of $${payment.amount} has been approved successfully.`,

      type: "SUCCESS",
    });

    console.log("AFTER NOTIFICATION");

    await createNotification({
      userId: payment.user_id,

      title: "Payment Approved",

      message: `Your payment of $${payment.amount} has been approved successfully.`,

      type: "SUCCESS",
    });

    /*
      CREATE ACTIVITY LOG
    */

    await createActivityLog({
      action: `Payment approved for ${payment.first_name} ${payment.last_name}`,

      type: "PAYMENT",
    });

    /*
      SUCCESS
    */

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to approve payment",
      },
      {
        status: 500,
      },
    );
  }
}
