export const authTypeDefs = `#graphql

  type AuthUser {
    id: ID!

    first_name: String!

    last_name: String!

    email: String!

    role: String!

    must_change_password: Boolean!
  }

  input LoginInput {
    email: String!

    password: String!
  }

  input RegisterInput {
    first_name: String!

    last_name: String!

    email: String!

    password: String!
  }

  type LoginResponse {
    token: String!

    user: AuthUser!
  }

  type RegisterResponse {
    id: ID!

    email: String!
  }

  extend type Mutation {
    login(
      input: LoginInput!
    ): LoginResponse!

    register(
      input: RegisterInput!
    ): RegisterResponse!
  }

`;
