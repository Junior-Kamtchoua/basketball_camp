export const programTypeDefs = `#graphql

  type Program {
    id: ID!
    title: String!
    description: String
    price: Float!
    duration_weeks: Int
    max_players: Int!
    current_players: Int!
    image_url: String
    is_active: Boolean!
    created_at: String!
  }

  type JoinProgramResponse {
    success: Boolean!
  }

  type ProgramApplicationActionResponse {
    success: Boolean!
  }

  extend type Query {
    programs: [Program!]!
  }

  input CreateProgramInput {
    title: String!
    description: String
    price: Float!
    duration_weeks: Int!
    max_players: Int!
  }

  extend type Mutation {
    createProgram(
      input: CreateProgramInput!
    ): Program!

    joinProgram(
      programId: ID!
    ): JoinProgramResponse!

    approveProgramApplication(
      applicationId: ID!
    ): ProgramApplicationActionResponse!

    rejectProgramApplication(
      applicationId: ID!
    ): ProgramApplicationActionResponse!
  }

`;
