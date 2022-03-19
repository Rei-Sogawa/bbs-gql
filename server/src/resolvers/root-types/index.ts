import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { UserRepository } = context.repositories;

    return UserRepository.get(userId);
  },
};
