import { Resolvers } from "../../graphql/generated";
import { authorize } from "../../lib/authorization/authorize";
import { TopicEntity } from "../../lib/entity/topic";
import { UserEntity } from "../../lib/entity/user";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { AuthService } = context.services;
    const { UserRepository } = context.repositories;

    const { uid } = await AuthService.createUser({ email, password });
    const user = UserEntity.create({ id: uid, displayName });
    return UserRepository.set(user);
  },

  createTopic: (_parent, args, context) => {
    authorize(context);

    const { title, description } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = TopicEntity.create({ title, description, userId: uid });
    return TopicRepository.add(topic);
  },

  updateTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { title, description } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = await TopicRepository.get(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");
    const editedTopic = TopicEntity.edit(topic, { title, description });
    return TopicRepository.update(editedTopic);
  },

  deleteTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = await TopicRepository.get(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");
    return TopicRepository.delete(topic);
  },
};
