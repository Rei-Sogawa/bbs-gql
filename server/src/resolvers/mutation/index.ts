import compose from "ramda/src/compose";

import { getAuth } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { assertLoggedIn } from "../../lib/authorization/assertLoggedIn";
import { UserData } from "../../lib/entity/user";
import { TopicData } from "./../../lib/entity/topic";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { users } = context.dataSources;

    const authUser = await getAuth().createUser({ email, password });
    const newUserData = compose(UserData.parse, UserData.of)({ displayName });
    await users.ref().doc(authUser.uid).set(newUserData);

    return users.findOne((ref) => ref().doc(authUser.uid));
  },
  createTopic: async (_parent, args, context) => {
    await assertLoggedIn(context);

    const { title, description } = args.input;
    const { uid } = context;
    const { topics } = context.dataSources;

    const newTopicData = compose(TopicData.parse, TopicData.of)({ title, description, userId: uid });
    const dRef = await topics.ref().add(newTopicData);

    return topics.findOne((ref) => ref().doc(dRef.id));
  },
};
