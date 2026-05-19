import { NextRequest } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { submitRegistrationForm } from "@/services/forms/submitRegistrationForm";

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const { formType, data } = body;

    if (!formType || !data) {
      return Response.json(
        {
          error: "Missing form data",
        },
        {
          status: 400,
        },
      );
    }

    await submitRegistrationForm({
      userId: user.id,
      formType,
      data,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to submit form",
      },
      {
        status: 500,
      },
    );
  }
}
