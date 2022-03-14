import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";

export const Query: Resolvers["Query"] = {
  me: async (_parent, _args, context) => {
    isLoggedIn(context);
    const { uid } = context;
    const { userRepository } = context.repositories;
    const userRaw = await userRepository.findById(uid);
    if (!userRaw) throw new Error("Not found");
    return userRaw;
  },

  topic: async (_parent, args, context) => {
    const { id } = args;
    const { topicRepository } = context.repositories;
    const topicRaw = await topicRepository.findById(id);
    if (!topicRaw) throw new Error("Not found");
    return topicRaw;
  },

  topics: (_parent, _args, context) => {
    const { topicRepository } = context.repositories;
    return topicRepository.findAll();
  },
};
