import { NextRequest } from "next/server";

import pool from "@/lib/db";

import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    await pool.query(
      `
      UPDATE messages

      SET is_read = true

      WHERE sender_id = $1
      AND receiver_id = $2
    `,
      [body.senderId, user.id],
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
