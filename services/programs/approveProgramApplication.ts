// services/programs/approveProgramApplication.ts

import pool from "@/lib/db";

interface Response {
  success: boolean;
}

export async function approveProgramApplication(
  applicationId: string,
): Promise<Response> {
  const applicationQuery = await pool.query(
    `
        SELECT
          id,
          status,
          program_id
        FROM player_programs
        WHERE id = $1
        LIMIT 1
      `,
    [applicationId],
  );

  const application = applicationQuery.rows[0] as
    | {
        id: string;
        status: string;
        program_id: string;
      }
    | undefined;

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.status === "approved") {
    throw new Error("Application already approved");
  }

  await pool.query(
    `
      UPDATE player_programs
      SET
        status = 'approved',
        approved_at = NOW()
      WHERE id = $1
    `,
    [applicationId],
  );

  await pool.query(
    `
      UPDATE programs
      SET current_players =
        current_players + 1
      WHERE id = $1
    `,
    [application.program_id],
  );

  return {
    success: true,
  };
}
