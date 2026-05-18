import pool from "@/lib/db";

interface Props {
  userId: string;

  title: string;

  message: string;

  type: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type,
}: Props): Promise<void> {
  await pool.query(
    `
      INSERT INTO notifications (
        user_id,
        title,
        message,
        type,
        is_read
      )

      VALUES (
        $1,
        $2,
        $3,
        $4,
        false
      )
    `,
    [userId, title, message, type],
  );
}
