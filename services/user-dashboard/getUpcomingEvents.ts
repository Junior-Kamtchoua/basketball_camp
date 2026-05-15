import pool from "@/lib/db";

import { UpcomingEvent } from "@/types/user-dashboard";

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const query = `
    SELECT
      id,

      title,

      start_time,

      location

    FROM events

    WHERE start_time >= NOW()

    ORDER BY start_time ASC

    LIMIT 5
  `;

  const result = await pool.query(query);

  return result.rows.map((event) => ({
    id: event.id,

    title: event.title,

    location: event.location,

    start_date: event.start_time,
  }));
}
