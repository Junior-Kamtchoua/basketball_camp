export const userTypeDefs = `#graphql

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: String!
    avatar_url: String
    is_active: Boolean!
    is_verified: Boolean!
    created_at: String!
  }

  extend type Query {
    users: [User!]!
  }

`;
