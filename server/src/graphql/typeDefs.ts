import { gql } from "apollo-server-express";

export const typeDefs = gql`
input CreateTopicInput {
  description: String!
  title: String!
}

scalar DateTime

type Mutation {
  createTopic(input: CreateTopicInput!): Topic!
  deleteTopic(id: ID!): Topic!
  signUp(input: SignUpInput!): User!
  updateTopic(id: ID!, input: UpdateTopicInput!): Topic!
}

type Query {
  me: User!
  topic(id: ID!): Topic!
  topics: [Topic!]!
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

input UpdateTopicInput {
  description: String!
  title: String!
}

type User {
  displayName: String!
  id: ID!
  topics: [Topic!]!
}
`;
