import pool from "@/lib/db";

import { ProgramApplication } from "@/types/program-application";

export async function getProgramApplications(): Promise<ProgramApplication[]> {
  const query = `
    SELECT
      player_programs.id
        AS application_id,

      player_programs.player_id,

      player_programs.program_id,

      player_programs.status,

      player_programs.enrolled_at
        AS created_at,

      programs.title
        AS program_title,

      users.id
        AS user_id,

      users.first_name,

      users.last_name,

      users.email,

      payments.payment_proof_url
        AS payment_proof,

      payments.status
        AS payment_status

    FROM player_programs

    INNER JOIN programs
      ON programs.id =
      player_programs.program_id

    INNER JOIN players
      ON players.id =
      player_programs.player_id

    INNER JOIN users
      ON users.id =
      players.user_id

    LEFT JOIN payments
      ON payments.player_program_id =
      player_programs.id

    ORDER BY player_programs.enrolled_at DESC
  `;

  const result = await pool.query(query);

  return result.rows as ProgramApplication[];
}
