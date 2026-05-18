import { dashboardResolver } from "./dashboardResolver";

import { userResolver } from "./userResolver";

import { teamResolver } from "./teamResolver";

import { authResolver } from "./authResolver";

import { userMutationResolver } from "./userMutationResolver";

import { updateUserResolver } from "./updateUserResolver";

import { programResolver } from "./programResolver";

export const resolvers = {
  Query: {
    ...dashboardResolver,

    ...userResolver,

    ...teamResolver.Query,

    ...programResolver.Query,
  },

  Mutation: {
    ...authResolver,

    ...userMutationResolver,

    ...updateUserResolver,

    ...teamResolver.Mutation,

    ...programResolver.Mutation,
  },
};
