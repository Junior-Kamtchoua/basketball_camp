import { NextRequest } from "next/server";

import pool from "@/lib/db";

interface Params {
  params: {
    notificationId: string;
  };
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    await pool.query(
      `
        UPDATE notifications

        SET is_read = true

        WHERE id = $1
      `,
      [params.notificationId],
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to update notification",
      },
      {
        status: 500,
      },
    );
  }
}
