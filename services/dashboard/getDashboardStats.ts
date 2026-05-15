import pool from "@/lib/db";

interface DashboardStats {
  totalUsers: number;

  totalAdmins: number;

  totalTeams: number;

  totalPrograms: number;

  totalRevenue: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalUsersQuery,

    totalAdminsQuery,

    totalTeamsQuery,

    totalProgramsQuery,

    totalRevenueQuery,
  ] = await Promise.all([
    pool.query(`
      SELECT COUNT(*)::int AS count

      FROM users

      WHERE role = 'USER'
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count

      FROM users

      WHERE role = 'ADMIN'
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count

      FROM teams
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count

      FROM programs
    `),

    pool.query(`
      SELECT
        COALESCE(
          SUM(amount),
          0
        )::float AS total

      FROM payments

      WHERE status = 'PAID'
    `),
  ]);

  return {
    totalUsers: totalUsersQuery.rows[0].count,

    totalAdmins: totalAdminsQuery.rows[0].count,

    totalTeams: totalTeamsQuery.rows[0].count,

    totalPrograms: totalProgramsQuery.rows[0].count,

    totalRevenue: totalRevenueQuery.rows[0].total,
  };
}
