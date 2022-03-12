import { assertLoggedIn } from "../lib/authorization/assertLoggedIn";
import { Resolvers } from "./../graphql/generated";

export const Query: Resolvers["Query"] = {
  me: (_parent, _args, context) => {
    assertLoggedIn(context);
    return context.dataSources.users.findOne((ref) => ref().doc(context.uid));
  },
};
