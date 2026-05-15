import { getCurrentUser } from "@/lib/getCurrentUser";

import pool from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          count: 0,
        },
        {
          status: 401,
        },
      );
    }

    const query = `
      SELECT COUNT(*)::int AS count

      FROM messages

      WHERE receiver_id = $1
      AND is_read = false
    `;

    const result = await pool.query(query, [user.id]);

    return Response.json({
      count: result.rows[0].count,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        count: 0,
      },
      {
        status: 500,
      },
    );
  }
}
