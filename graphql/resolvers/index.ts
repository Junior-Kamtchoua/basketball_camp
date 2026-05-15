import { userResolver } from "./userResolver";
import { teamResolver } from "./teamResolver";
import { dashboardResolver } from "./dashboardResolver";

import { userMutationResolver } from "./userMutationResolver";
import { authResolver } from "./authResolver";
import { updateUserResolver } from "./updateUserResolver";

export const resolvers = {
  Query: {
    ...userResolver,
    ...teamResolver,
    ...dashboardResolver,
  },

  Mutation: {
    ...userMutationResolver,
    ...authResolver,
    ...updateUserResolver,
  },
};
