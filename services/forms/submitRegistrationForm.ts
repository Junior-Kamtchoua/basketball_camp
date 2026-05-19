import pool from "@/lib/db";

interface SubmitRegistrationFormProps {
  userId: string;

  formType: "CAMP" | "CLUB";

  data: Record<string, unknown>;
}

export async function submitRegistrationForm({
  userId,
  formType,
  data,
}: SubmitRegistrationFormProps) {
  const existingForm = await pool.query(
    `
      SELECT id
      FROM registration_forms
      WHERE user_id = $1
      AND form_type = $2
      LIMIT 1
    `,
    [userId, formType],
  );

  if (existingForm.rows.length > 0) {
    await pool.query(
      `
        UPDATE registration_forms
        SET
          data = $1,
          submitted_at = NOW(),
          status = 'PENDING'
        WHERE user_id = $2
        AND form_type = $3
      `,
      [JSON.stringify(data), userId, formType],
    );
  } else {
    await pool.query(
      `
        INSERT INTO registration_forms (
          user_id,
          form_type,
          data
        )
        VALUES ($1, $2, $3)
      `,
      [userId, formType, JSON.stringify(data)],
    );
  }

  const admins = await pool.query(`
    SELECT id
    FROM users
    WHERE role = 'ADMIN'
  `);

  for (const admin of admins.rows) {
    await pool.query(
      `
        INSERT INTO notifications (
          user_id,
          title,
          message,
          type
        )
        VALUES ($1, $2, $3, $4)
      `,
      [
        admin.id,
        "New Registration Form",
        `A player submitted a ${formType} registration form.`,
        "INFO",
      ],
    );
  }

  return {
    success: true,
  };
}
