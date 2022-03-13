import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";

export const Query: Resolvers["Query"] = {
  me: (_parent, _args, context) => {
    isLoggedIn(context);
    const { users } = context.dataSources;
    return users.findOne((ref) => ref().doc(context.uid));
  },
  topic: (_parent, args, context) => {
    const { id } = args;
    const { topics } = context.dataSources;
    return topics.findOne((ref) => ref().doc(id));
  },
  topics: (_parent, _args, context) => {
    const { topics } = context.dataSources;
    return topics.findMany((ref) => ref().orderBy("createdAt", "desc"));
  },
};
