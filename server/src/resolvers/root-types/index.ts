import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: async (parent, _args, context) => {
    const { userId } = parent;
    const { userRepository } = context.repositories;
    const userRaw = await userRepository.findById(userId);
    if (!userRaw) throw new Error("Not found");
    return userRaw;
  },
};
