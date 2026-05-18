import pool from "@/lib/db";

import { createActivityLog } from "@/services/audit/createActivityLog";

export async function joinProgram(userId: string, programId: string) {
  /*
    GET PLAYER
  */

  const playerQuery = await pool.query(
    `
      SELECT id

      FROM players

      WHERE user_id = $1

      LIMIT 1
    `,
    [userId],
  );

  const player = playerQuery.rows[0];

  if (!player) {
    throw new Error("Player profile not found");
  }

  /*
    GET PROGRAM
  */

  const programQuery = await pool.query(
    `
      SELECT
        id,

        max_players,

        current_players

      FROM programs

      WHERE id = $1

      LIMIT 1
    `,
    [programId],
  );

  const program = programQuery.rows[0];

  if (!program) {
    throw new Error("Program not found");
  }

  /*
    CHECK FULL
  */

  if (Number(program.current_players) >= Number(program.max_players)) {
    throw new Error("Program is full");
  }

  /*
    CHECK EXISTING
  */

  const existingQuery = await pool.query(
    `
        SELECT id

        FROM player_programs

        WHERE player_id = $1
        AND program_id = $2

        LIMIT 1
      `,
    [player.id, programId],
  );

  if (existingQuery.rows[0]) {
    throw new Error("Already enrolled");
  }

  /*
    ENROLL PLAYER
  */

  await pool.query(
    `
      INSERT INTO player_programs (
        player_id,
        program_id
      )

      VALUES ($1, $2)
    `,
    [player.id, programId],
  );

  /*
    ACTIVITY LOG
  */

  await createActivityLog({
    action: "A player requested to join a program",

    type: "PROGRAM",
  });

  /*
    UPDATE COUNT
  */

  await pool.query(
    `
      UPDATE programs

      SET current_players =
      current_players + 1

      WHERE id = $1
    `,
    [programId],
  );

  return {
    success: true,
  };
}
