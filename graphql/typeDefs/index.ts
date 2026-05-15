import { userTypeDefs } from "./user";
import { teamTypeDefs } from "./team";
import { dashboardTypeDefs } from "./dashboard";
import { authTypeDefs } from "./auth";
import { userMutationTypeDefs } from "./userMutation";
import { updateUserTypeDefs } from "./updateUser";

export const typeDefs = `#graphql

  ${userTypeDefs}

  ${teamTypeDefs}

  ${dashboardTypeDefs}

  ${userMutationTypeDefs}

  ${authTypeDefs}

  ${updateUserTypeDefs}
  
  type Query {
    users: [User!]!
    teams: [Team!]!
    dashboardStats: DashboardStats!
  }

`;
