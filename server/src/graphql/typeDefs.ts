import { gql } from "apollo-server-express";

export const typeDefs = gql`
input CreateTopicInput {
  description: String!
  title: String!
}

scalar DateTime

type Mutation {
  createTopic(input: CreateTopicInput!): Topic!
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
  user: User!
}

type User {
  displayName: String!
  id: ID!
}
`;
