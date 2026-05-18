import pool from "@/lib/db";

interface Props {
  action: string;

  type: string;
}

export async function createActivityLog({ action, type }: Props) {
  await pool.query(
    `
      INSERT INTO activity_logs (
        action,
        type
      )

      VALUES ($1, $2)
    `,
    [action, type],
  );
}
