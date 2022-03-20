import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Comment {
  content: String!
  createdAt: DateTime!
  id: ID!
  parent: TopicOrComment!
  root: Topic!
  updatedAt: DateTime!
  user: User!
}

input CreateCommentInput {
  content: String!
  parentId: String!
  rootId: String!
}

input CreateTopicInput {
  content: String!
  title: String!
}

scalar DateTime

type Mutation {
  createComment(input: CreateCommentInput!): TopicOrComment!
  createTopic(input: CreateTopicInput!): Topic!
  deleteComment(id: ID!): TopicOrComment!
  deleteTopic(id: ID!): Topic!
  signUp(input: SignUpInput!): User!
  updateComment(id: ID!, input: UpdateCommentInput!): Comment!
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
  comments: [Comment!]!
  content: String!
  createdAt: DateTime!
  id: ID!
  title: String!
  updatedAt: DateTime!
  user: User!
}

union TopicOrComment = Comment | Topic

input UpdateCommentInput {
  content: String!
}

input UpdateTopicInput {
  content: String!
  title: String!
}

type User {
  displayName: String!
  id: ID!
  topics: [Topic!]!
}
`;
