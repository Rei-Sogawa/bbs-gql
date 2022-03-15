import { getAuth } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";
import { TopicEntity } from "./../../lib/entity/topic";
import { UserEntity } from "./../../lib/entity/user";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { userRepository } = context.repositories;

    const { uid } = await getAuth().createUser({ email, password });

    const user = UserEntity.new({ id: uid, displayName });
    return userRepository.createWithId(user.toRaw());
  },

  createTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { title, description } = args.input;
    const { uid } = context;
    const { topicRepository } = context.repositories;

    const topic = TopicEntity.new({ title, description, userId: uid });
    return topicRepository.create(topic.toRawData());
  },

  updateTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { title, description } = args.input;
    const { uid } = context;
    const { topicRepository } = context.repositories;

    const topicRaw = await topicRepository.findById(id);
    const topic = new TopicEntity(topicRaw);
    if (!topic.isCreatedBy({ userId: uid })) throw new Error("Cannot write topic");

    topic.edit({ title, description });
    return topicRepository.update(topic.toRaw());
  },

  deleteTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { uid } = context;
    const { topicRepository } = context.repositories;

    const topicRaw = await topicRepository.findById(id);
    const topic = new TopicEntity(topicRaw);
    if (!topic.isCreatedBy({ userId: uid })) throw new Error("Cannot write topic");

    return topicRepository.delete(topic.toRaw());
  },
};
