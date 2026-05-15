import { NextRequest } from "next/server";

import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth";

import { changePassword } from "@/services/auth/changePassword";

interface DecodedToken {
  userId: string;

  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token) as DecodedToken | null;

    if (!decoded) {
      return Response.json(
        {
          error: "Invalid token",
        },
        {
          status: 401,
        },
      );
    }

    await changePassword({
      userId: decoded.userId,

      newPassword: body.password,
    });

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
