export const teamTypeDefs = `#graphql

  type Team {
    id: ID!
    name: String!
    age_group: String
    logo_url: String
    coach_id: String
    win_rate: Float
    created_at: String!
    players_count: Int!
  }

  type TeamMutationResponse {
    success: Boolean!
  }

  type AssignPlayerToTeamResponse {
    success: Boolean!
  }

  input CreateTeamInput {
    name: String!
    age_group: String
  }

  input UpdateTeamInput {
    id: ID!

    name: String!

    age_group: String

    win_rate: Float!
  }

  extend type Query {
    teams: [Team!]!
  }

  extend type Mutation {
    createTeam(
      input: CreateTeamInput!
    ): Team!

    updateTeam(
      input: UpdateTeamInput!
    ): Team!

    deleteTeam(
      teamId: ID!
    ): TeamMutationResponse!

    assignPlayerToTeam(
      playerId: ID!
      teamId: ID!
    ): AssignPlayerToTeamResponse!
  }

`;
