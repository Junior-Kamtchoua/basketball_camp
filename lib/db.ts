import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool =
  global.pgPool ||
  new Pool({
    connectionString,

    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

pool.on("error", (error) => {
  console.error("PostgreSQL pool error:", error);
});

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export default pool;
