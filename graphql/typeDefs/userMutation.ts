export const userMutationTypeDefs = `#graphql

  input CreateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    role: String!
  }

  extend type Mutation {
    createUser(
      input: CreateUserInput!
    ): User!

    deleteUser(
      id: ID!
    ): Boolean!
  }

`;
