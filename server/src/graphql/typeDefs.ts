import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Mutation {
  signUp(input: SignUpInput!): User!
}

type Query {
  me: User!
}

input SignUpInput {
  displayName: String!
  email: String!
  password: String!
}

type User {
  displayName: String!
  id: ID!
}
`;
