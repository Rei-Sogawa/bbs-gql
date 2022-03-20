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
      await CommentRepository.set({ topicId: topic.id }, comment);
      return topic;
    }
    throw new Error("rootId and parentId do not match");
  },

  updateComment: async (_parent, args, context) => {
    authorize(context);

    const {
      id,
      input: { content },
    } = args;
    const { uid } = context;
    const { CommentGroupRepository } = context.repositories;

    const comment = await CommentGroupRepository.get(id);
    if (!CommentEntity.isCreatedBy(comment, { userId: uid })) throw new Error("Cannot write comment");
    const editedComment = CommentEntity.edit(comment, { content });
    return CommentGroupRepository.update(editedComment);
  },

  deleteComment: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { TopicRepository, CommentGroupRepository } = context.repositories;

    const comment = await CommentGroupRepository.get(id);
    if (!CommentEntity.isCreatedBy(comment, { userId: uid })) throw new Error("Cannot write comment");
    await CommentGroupRepository.delete(comment);

    if (comment.rootId === comment.parentId) {
      return TopicRepository.get(comment.parentId);
    }
    throw new Error("rootId and parentId do not match");
  },
};
