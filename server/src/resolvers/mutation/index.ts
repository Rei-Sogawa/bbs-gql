import compose from "ramda/src/compose";

import { getAuth } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { UserData } from "../../lib/entity/user";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { users } = context.dataSources;

    const authUser = await getAuth().createUser({ email, password });
    const newUserData = compose(UserData.parse, UserData.of)({ displayName });
    await users.ref().doc(authUser.uid).set(newUserData);

    return users.findOne((ref) => ref().doc(authUser.uid));
  },
  // createTopic: async (_parent, args, { ,dataSources: { users } }) => {},
};
