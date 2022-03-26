import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Comment {
  comments: CommentConnection!
  content: String!
  createdAt: DateTime!
  id: ID!
  parent: CommentParent!
  updatedAt: DateTime!
  user: User!
}

type CommentConnection {
  edges: [CommentEdge!]!
  pageInfo: PageInfo!
}

type CommentEdge {
  cursor: DateTime!
  node: Comment!
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
  createComment(input: CreateCommentInput!): CommentEdge!
  createTopic(input: CreateTopicInput!): Topic!
  deleteComment(id: ID!): CommentEdge!
  deleteTopic(id: ID!): Topic!
  signUp(input: SignUpInput!): User!
  updateComment(id: ID!, input: UpdateCommentInput!): Comment!
  updateTopic(id: ID!, input: UpdateTopicInput!): Topic!
}

type PageInfo {
  endCursor: DateTime
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: DateTime
}

input PaginateInput {
  after: DateTime
  before: DateTime
  first: Int
  last: Int
}

type Query {
  me: User!
  topic(id: ID!): Topic!
  topics(input: PaginateInput!): TopicConnection!
}

input SignUpInput {
  displayName: String!
  email: String!
  password: String!
}

type Topic {
  comments(input: PaginateInput!): CommentConnection!
  content: String!
  createdAt: DateTime!
  id: ID!
  title: String!
  updatedAt: DateTime!
  user: User!
}

type TopicConnection {
  edges: [TopicEdge!]!
  pageInfo: PageInfo!
}

type TopicEdge {
  cursor: DateTime!
  node: Topic!
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
