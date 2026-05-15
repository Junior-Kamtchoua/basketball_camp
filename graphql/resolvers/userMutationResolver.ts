import { createUser } from "@/services/users/createUser";

import { deleteUser } from "@/services/users/deleteUser";

interface CreateUserArgs {
  input: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
  };
}

interface DeleteUserArgs {
  id: string;
}

export const userMutationResolver = {
  createUser: async (_: unknown, { input }: CreateUserArgs) => {
    return await createUser(input);
  },

  deleteUser: async (_: unknown, { id }: DeleteUserArgs) => {
    return await deleteUser(id);
  },
};
