import { updateUser } from "@/services/users/updateUser";

interface UpdateUserArgs {
  id: string;

  input: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

export const updateUserResolver = {
  updateUser: async (_: unknown, { id, input }: UpdateUserArgs) => {
    return await updateUser({
      id,
      ...input,
    });
  },
};
