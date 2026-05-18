import { NextRequest } from "next/server";

import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, location, coach_name, team_id, start_time, end_time } = body;

    await pool.query(
      `
        INSERT INTO events (
          title,
          location,
          coach_name,
          team_id,
          start_time,
          end_time,
          status
        )

        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          'UPCOMING'
        )
      `,
      [title, location, coach_name, team_id, start_time, end_time],
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to create event",
      },
      {
        status: 500,
      },
    );
  }
}
