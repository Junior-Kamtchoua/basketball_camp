import { loginUser } from "@/services/auth/loginUser";

import { registerUser } from "@/services/auth/registerUser";

import { generateToken } from "@/lib/auth";

interface LoginArgs {
  input: {
    email: string;

    password: string;
  };
}

interface RegisterArgs {
  input: {
    first_name: string;

    last_name: string;

    email: string;

    password: string;
  };
}

interface LoginUserResult {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  role: string;

  must_change_password: boolean;
}

export const authResolver = {
  login: async (
    _: unknown,

    { input }: LoginArgs,
  ) => {
    const user = (await loginUser(input)) as LoginUserResult;

    const token = generateToken({
      userId: user.id,

      role: user.role,

      must_change_password: user.must_change_password,
    });

    return {
      token,

      user: {
        id: user.id,

        first_name: user.first_name,

        last_name: user.last_name,

        email: user.email,

        role: user.role,

        must_change_password: user.must_change_password,
      },
    };
  },

  register: async (
    _: unknown,

    { input }: RegisterArgs,
  ) => {
    return await registerUser(input);
  },
};
