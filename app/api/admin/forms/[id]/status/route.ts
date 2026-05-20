import { NextRequest } from "next/server";

import pool from "@/lib/db";

import { getCurrentUser } from "@/lib/getCurrentUser";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    if (user.role !== "ADMIN") {
      return Response.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    const { id } = await params;

    const body = await request.json();

    const { status } = body;

    if (status !== "APPROVED" && status !== "REJECTED") {
      return Response.json(
        {
          error: "Invalid status",
        },
        {
          status: 400,
        },
      );
    }

    const existingForm = await pool.query(
      `
        SELECT *
        FROM registration_forms
        WHERE id = $1
      `,
      [id],
    );

    if (existingForm.rows.length === 0) {
      return Response.json(
        {
          error: "Form not found",
        },
        {
          status: 404,
        },
      );
    }

    const form = existingForm.rows[0];

    await pool.query(
      `
        UPDATE registration_forms
        SET
          status = $1,
          reviewed_at = NOW(),
          reviewed_by = $2
        WHERE id = $3
      `,
      [status, user.id, id],
    );

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
        form.user_id,

        status === "APPROVED"
          ? "Registration Approved"
          : "Registration Rejected",

        status === "APPROVED"
          ? "Your registration form has been approved by the administration."
          : "Your registration form has been rejected by the administration.",

        status === "APPROVED" ? "SUCCESS" : "ERROR",
      ],
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to update form status",
      },
      {
        status: 500,
      },
    );
  }
}
