import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";

export const Query: Resolvers["Query"] = {
  me: (_parent, _args, context) => {
    isLoggedIn(context);
    const { uid } = context;
    const { userRepository } = context.repositories;
    return userRepository.findById(uid).then((user) => user.toRaw());
  },

  topic: (_parent, args, context) => {
    const { id } = args;
    const { topicRepository } = context.repositories;
    return topicRepository.findById(id).then((topic) => topic.toRaw());
  },

  topics: (_parent, _args, context) => {
    const { topicRepository } = context.repositories;
    return topicRepository.findAll().then((topics) => topics.map((topic) => topic.toRaw()));
  },
};
