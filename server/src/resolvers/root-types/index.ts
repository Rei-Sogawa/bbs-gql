import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { userRepository } = context.repositories;
    return userRepository.findById(userId).then((user) => user.toRaw());
  },
};
