export const teamTypeDefs = `#graphql

  type Team {
    id: ID!
    name: String!
    age_group: String
    logo_url: String
    coach_id: String
    win_rate: Float
    created_at: String!
  }

`;
