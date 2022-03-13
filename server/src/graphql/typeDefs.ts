import { gql } from "apollo-server-express";

export const typeDefs = gql`
scalar DateTime

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

type Topic {
  createdAt: DateTime!
  description: String!
  id: ID!
  title: String!
  updatedAt: DateTime!
}

type User {
  createdAt: DateTime!
  displayName: String!
  id: ID!
  updatedAt: DateTime!
}
`;
