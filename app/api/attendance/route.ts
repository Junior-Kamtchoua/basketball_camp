import { NextRequest } from "next/server";

import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { player_id, event_id, status } = body;

    const existing = await pool.query(
      `
          SELECT id
          FROM attendance
          WHERE player_id = $1
          AND event_id = $2
          LIMIT 1
        `,
      [player_id, event_id],
    );

    if (existing.rows[0]) {
      await pool.query(
        `
          UPDATE attendance
          SET status = $1,
              marked_at = NOW()
          WHERE player_id = $2
          AND event_id = $3
        `,
        [status, player_id, event_id],
      );
    } else {
      await pool.query(
        `
          INSERT INTO attendance (
            player_id,
            event_id,
            status
          )

          VALUES (
            $1,
            $2,
            $3
          )
        `,
        [player_id, event_id, status],
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to mark attendance",
      },
      {
        status: 500,
      },
    );
  }
}
