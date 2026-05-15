export const updateUserTypeDefs = `#graphql

  input UpdateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    role: String!
  }

  extend type Mutation {
    updateUser(
      id: ID!,
      input: UpdateUserInput!
    ): User!
  }

`;
