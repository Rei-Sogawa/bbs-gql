import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Comment {
  comments: [Comment!]!
  content: String!
  createdAt: DateTime!
  id: ID!
  parent: CommentParent!
  updatedAt: DateTime!
  user: User!
}

union CommentParent = Comment | Topic

enum CommentParentName {
  comment
  topic
}

input CreateCommentInput {
  content: String!
  parentId: String!
  parentName: CommentParentName!
}

input CreateTopicInput {
  content: String!
  title: String!
}

scalar DateTime

type Mutation {
  createComment(input: CreateCommentInput!): CommentParent!
  createTopic(input: CreateTopicInput!): Topic!
  deleteComment(id: ID!): CommentParent!
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
