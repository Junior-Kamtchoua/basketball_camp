import pool from "@/lib/db";

export interface UserProfileStats {
  attendance_rate: number;

  total_programs: number;

  total_payments: number;

  unread_messages: number;

  average_score: number;
}

export async function getUserProfileStats(
  userId: string,
): Promise<UserProfileStats> {
  const playerQuery = await pool.query(
    `
    SELECT id
    FROM players
    WHERE user_id = $1
    LIMIT 1
  `,
    [userId],
  );

  const playerId: string | undefined = playerQuery.rows[0]?.id;

  if (!playerId) {
    return {
      attendance_rate: 0,
      total_programs: 0,
      total_payments: 0,
      unread_messages: 0,
      average_score: 0,
    };
  }

  const [
    attendanceResult,
    programsResult,
    paymentsResult,
    messagesResult,
    evaluationsResult,
  ] = await Promise.all([
    pool.query(
      `
      SELECT
        COALESCE(
          ROUND(
            AVG(
              CASE
                WHEN status = 'PRESENT'
                THEN 100
                ELSE 0
              END
            )
          ),
          0
        )::int AS attendance_rate

      FROM attendance

      WHERE player_id = $1
    `,
      [playerId],
    ),

    pool.query(
      `
      SELECT COUNT(*)::int AS total_programs

      FROM player_programs

      WHERE player_id = $1
    `,
      [playerId],
    ),

    pool.query(
      `
      SELECT
        COALESCE(
          SUM(amount),
          0
        )::float AS total_payments

      FROM payments

      WHERE player_id = $1
    `,
      [playerId],
    ),

    pool.query(
      `
      SELECT COUNT(*)::int AS unread_messages

      FROM messages

      WHERE receiver_id = $1
      AND is_read = false
    `,
      [userId],
    ),

    pool.query(
      `
      SELECT
        COALESCE(
          ROUND(AVG(score)),
          0
        )::int AS average_score

      FROM evaluations

      WHERE player_id = $1
    `,
      [playerId],
    ),
  ]);

  return {
    attendance_rate: attendanceResult.rows[0]?.attendance_rate || 0,

    total_programs: programsResult.rows[0]?.total_programs || 0,

    total_payments: paymentsResult.rows[0]?.total_payments || 0,

    unread_messages: messagesResult.rows[0]?.unread_messages || 0,

    average_score: evaluationsResult.rows[0]?.average_score || 0,
  };
}
