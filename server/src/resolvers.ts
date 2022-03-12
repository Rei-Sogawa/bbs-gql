import { Resolvers } from "./graphql/generated";
import { Mutation } from "./mutation";
import { Query } from "./query";

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
