import * as admin from "firebase-admin";
import { compose, omit } from "ramda";

import { getAuth } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";
import { UserData } from "../../lib/entity/user";
import { TopicData } from "./../../lib/entity/topic";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { users } = context.dataSources;

    const { uid } = await getAuth().createUser({ email, password });

    const newUserData = compose(UserData.parse, UserData.of)({ displayName });
    await users.ref().doc(uid).set(newUserData);

    return users.findOne((ref) => ref().doc(uid));
  },
  createTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { title, description } = args.input;
    const { uid } = context;
    const { topics } = context.dataSources;

    const newTopicData = compose(TopicData.parse, TopicData.of)({ title, description, userId: uid });
    const { id } = await topics.ref().add(newTopicData);

    return topics.findOne((ref) => ref().doc(id));
  },
  updateTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { title, description } = args.input;
    const { uid } = context;
    const { topics } = context.dataSources;

    const topicDoc = await topics.findOne((ref) => ref().doc(id));
    if (topicDoc.userId !== uid) throw new Error("Cannot write topic");

    const editTopicData = omit(["id"], { ...topicDoc, title, description, updatedAt: admin.firestore.Timestamp.now() });
    TopicData.parse(editTopicData);
    await topics.ref().doc(id).set(editTopicData);
    topics.deleteFromCache((ref) => ref().doc(id));

    return topics.findOne((ref) => ref().doc(id));
  },
  deleteTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { uid } = context;
    const { topics } = context.dataSources;

    const topicDoc = await topics.findOne((ref) => ref().doc(id));
    if (topicDoc.userId !== uid) throw new Error("Cannot write topic");

    await topics.ref().doc(id).delete();
    topics.deleteFromCache((ref) => ref().doc(id));

    return topicDoc;
  },
};
