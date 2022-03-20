import { Resolvers } from "../../graphql/generated";
import { authorize } from "../../lib/authorization/authorize";
import { TopicEntity } from "../../lib/entity/topic";
import { signUp } from "../../lib/usecase/mutation/signUp";
import { CommentEntity } from "./../../lib/entity/comment";

export const Mutation: Resolvers["Mutation"] = {
  signUp,
  createTopic: (_parent, args, context) => {
    authorize(context);

    const { title, content } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = TopicEntity.create({ title, content, userId: uid });
    return TopicRepository.add(topic);
  },

  updateTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { title, content } = args.input;
    const { uid } = context;
    const { TopicRepository } = context.repositories;

    const topic = await TopicRepository.get(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");
    const editedTopic = TopicEntity.edit(topic, { title, content });
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

  createComment: async (_parent, args, context) => {
    authorize(context);

    const { content, rootId, parentId } = args.input;
    const { uid } = context;
    const { TopicRepository, CommentRepository } = context.repositories;

    if (rootId === parentId) {
      const topic = await TopicRepository.get(rootId);
      const comment = CommentEntity.create({ content, rootId, parentId, userId: uid });
      return CommentRepository.add({ topicId: topic.id }, comment);
    }
    throw new Error("Cannot match rootId and parentId");
  },
};
