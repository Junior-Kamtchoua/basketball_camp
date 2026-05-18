import pool from "@/lib/db";

interface Response {
  success: boolean;
}

export async function rejectProgramApplication(
  applicationId: string,
): Promise<Response> {
  const applicationQuery = await pool.query(
    `
        SELECT
          id,
          status

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
      }
    | undefined;

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.status === "rejected") {
    throw new Error("Application already rejected");
  }

  await pool.query(
    `
      UPDATE player_programs

      SET
        status = 'rejected',
        rejected_at = NOW()

      WHERE id = $1
    `,
    [applicationId],
  );

  return {
    success: true,
  };
}
