import pool from "@/lib/db";

export async function GET() {
  await pool.query(`
    DELETE FROM messages
    WHERE created_at < NOW() - INTERVAL '30 days'
  `);

  return Response.json({
    success: true,
  });
}
