// graphql/typeDefs/index.ts

import { userTypeDefs } from "./user";
import { teamTypeDefs } from "./team";
import { dashboardTypeDefs } from "./dashboard";
import { authTypeDefs } from "./auth";
import { userMutationTypeDefs } from "./userMutation";
import { updateUserTypeDefs } from "./updateUser";
import { programTypeDefs } from "./program";

export const typeDefs = /* GraphQL */ `
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  ${userTypeDefs}

  ${teamTypeDefs}

  ${dashboardTypeDefs}

  ${userMutationTypeDefs}

  ${authTypeDefs}

  ${updateUserTypeDefs}

  ${programTypeDefs}
`;
