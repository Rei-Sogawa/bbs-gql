import { getAuth } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";
import { TopicEntity } from "../../lib/entity/topic";
import { UserEntity } from "../../lib/entity/user";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { UserRepository } = context.repositories;

    const { uid } = await getAuth().createUser({ email, password });

    const user = UserEntity.create({ id: uid, displayName });
    await UserRepository.set(user);
    return user;
  },

  createTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { title, description } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = TopicEntity.create({ title, description, userId: uid });
    await TopicRepository.add(topic);
    return topic;
  },

  updateTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { title, description } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = await TopicRepository.get(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");

    const editedTopic = TopicEntity.edit({ title, description });
    await TopicRepository.update(editedTopic);
    return editedTopic;
  },

  deleteTopic: async (_parent, args, context) => {
    isLoggedIn(context);

    const { id } = args;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = await TopicRepository.get(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");

    await TopicRepository.delete(topic);
    return topic;
  },
};
