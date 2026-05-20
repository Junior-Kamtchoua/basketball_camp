import pool from "@/lib/db";

export async function getRegistrationForms() {
  const result = await pool.query(`
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

    ORDER BY registration_forms.submitted_at DESC
  `);

  return result.rows;
}
