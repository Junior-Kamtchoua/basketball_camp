// services/auth/changePassword.ts

import bcrypt from "bcryptjs";
import pool from "@/lib/db";

interface ChangePasswordInput {
  userId: string;
  newPassword: string;
}

export async function changePassword({
  userId,
  newPassword,
}: ChangePasswordInput) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = `
    UPDATE users
    SET
      password = $1,
      must_change_password = false,
      temporary_password = false
    WHERE id = $2
  `;

  await pool.query(query, [hashedPassword, userId]);

  return true;
}
