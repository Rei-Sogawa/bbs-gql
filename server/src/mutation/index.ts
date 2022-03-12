import { UserData } from "../lib/entity/user";
import { getAuth } from "./../firebase-app";
import { Resolvers } from "./../graphql/generated";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, { dataSources: { users } }) => {
    const authUser = await getAuth().createUser({ email: args.input.email, password: args.input.password });
    await users
      .ref()
      .doc(authUser.uid)
      .set(UserData.of({ displayName: args.input.displayName }));
    return users.findOne((ref) => ref().doc(authUser.uid));
  },
};
