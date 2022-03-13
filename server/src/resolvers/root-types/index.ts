import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: async (parent, _args, context) => {
    const { userId } = parent;
    const { users } = context.dataSources;
    return users.findOne((ref) => ref().doc(userId));
  },
};
