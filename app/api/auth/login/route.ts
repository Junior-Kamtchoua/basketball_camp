import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { loginUser } from "@/services/auth/loginUser";
import { generateToken } from "@/lib/auth";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody;

    if (!body.email || !body.password) {
      return Response.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await loginUser({
      email: body.email,
      password: body.password,
    });

    const token = generateToken({
      userId: user.id,
      role: user.role,
      must_change_password: user.must_change_password,
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        must_change_password: user.must_change_password,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Login failed",
      },
      {
        status: 401,
      },
    );
  }
}
