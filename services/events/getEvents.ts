import pool from "@/lib/db";

export interface EventItem {
  id: string;

  title: string;

  description: string | null;

  location: string | null;

  start_time: string;

  end_time: string;

  status: string;

  coach_name: string | null;

  duration_hours: number;

  team_name: string | null;
}

interface EventRow {
  id: string;

  title: string;

  description: string | null;

  location: string | null;

  start_time: string;

  end_time: string;

  status: string;

  coach_name: string | null;

  duration_hours: number;

  team_name: string | null;
}

export async function getEvents(): Promise<EventItem[]> {
  const query = `
    SELECT
      events.id,

      events.title,

      events.description,

      events.location,

      events.start_time,

      events.end_time,

      events.status,

      events.coach_name,

      events.duration_hours,

      teams.name
        AS team_name

    FROM events

    LEFT JOIN teams
      ON teams.id =
      events.team_id

    ORDER BY events.start_time ASC
  `;

  const result = await pool.query(query);

  return result.rows.map(
    (event: EventRow): EventItem => ({
      id: event.id,

      title: event.title,

      description: event.description,

      location: event.location,

      start_time: event.start_time,

      end_time: event.end_time,

      status: event.status,

      coach_name: event.coach_name,

      duration_hours: Number(event.duration_hours),

      team_name: event.team_name,
    }),
  );
}
