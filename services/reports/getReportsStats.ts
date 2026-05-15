import pool from "@/lib/db";

export async function getReportsStats() {
  const totalRevenueQuery = await pool.query(`
      SELECT
        COALESCE(SUM(amount), 0) AS total
      FROM payments
      WHERE status = 'PAID'
    `);

  const totalUsersQuery = await pool.query(`
      SELECT COUNT(*) AS total
      FROM users
    `);

  const totalTeamsQuery = await pool.query(`
      SELECT COUNT(*) AS total
      FROM teams
    `);

  const totalProgramsQuery = await pool.query(`
      SELECT COUNT(*) AS total
      FROM programs
    `);

  return {
    totalRevenue: Number(totalRevenueQuery.rows[0].total),

    totalUsers: Number(totalUsersQuery.rows[0].total),

    totalTeams: Number(totalTeamsQuery.rows[0].total),

    totalPrograms: Number(totalProgramsQuery.rows[0].total),
  };
}
