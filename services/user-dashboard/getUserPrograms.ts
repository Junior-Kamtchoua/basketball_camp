import pool from "@/lib/db";

import { Program } from "@/types/program";

export interface UserProgram extends Program {
  application_status: string;

  /*
    IMPORTANT
    Used for payment uploads
  */

  player_program_id: string;
}

interface ProgramRow {
  id: string;

  title: string;

  description: string | null;

  price: number;

  duration_weeks: number | null;

  max_players: number;

  current_players: number;

  image_url: string | null;

  is_active: boolean;

  created_at: string;

  application_status: string;

  player_program_id: string;
}

export async function getUserPrograms(userId: string): Promise<UserProgram[]> {
  /*
    GET PLAYER ID
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

  const player = playerQuery.rows[0] as
    | {
        id: string;
      }
    | undefined;

  /*
    NO PLAYER PROFILE
  */

  if (!player) {
    return [];
  }

  /*
    GET USER PROGRAMS
  */

  const query = `
    SELECT
      programs.id,

      programs.title,

      programs.description,

      programs.price,

      programs.duration_weeks,

      programs.max_players,

      programs.current_players,

      programs.image_url,

      programs.is_active,

      programs.created_at,

      player_programs.status
        AS application_status,

      player_programs.id
        AS player_program_id

    FROM player_programs

    INNER JOIN programs
      ON programs.id =
      player_programs.program_id

    WHERE player_programs.player_id = $1

    ORDER BY programs.created_at DESC
  `;

  const result = await pool.query(query, [player.id]);

  return result.rows.map(
    (program: ProgramRow): UserProgram => ({
      id: program.id,

      title: program.title,

      description: program.description,

      price: Number(program.price),

      duration_weeks: program.duration_weeks,

      max_players: program.max_players,

      current_players: program.current_players,

      image_url: program.image_url,

      is_active: program.is_active,

      created_at: program.created_at,

      application_status: program.application_status,

      player_program_id: program.player_program_id,
    }),
  );
}
