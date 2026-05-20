import pool from "@/lib/db";

export async function getRegistrationFormById(id: string) {
  const result = await pool.query(
    `
      SELECT
        registration_forms.id,
        registration_forms.form_type,
        registration_forms.status,
        registration_forms.submitted_at,
        registration_forms.data,

        users.first_name,
        users.last_name,
        users.email

      FROM registration_forms

      INNER JOIN users
        ON users.id = registration_forms.user_id

      WHERE registration_forms.id = $1

      LIMIT 1
    `,
    [id],
  );

  return result.rows[0] || null;
}
