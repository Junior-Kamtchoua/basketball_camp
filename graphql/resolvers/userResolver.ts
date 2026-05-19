// graphql/resolvers/userResolver.ts

import { getAllUsers } from "@/services/users/getAllUsers";

export const userResolver = {
  users: async () => {
    return await getAllUsers();
  },
};
