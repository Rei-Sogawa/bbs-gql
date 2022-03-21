import { Resolvers } from "../../graphql/generated";
import { authorize } from "../../lib/authorization/authorize";
import { TopicEntity } from "../../lib/entity/topic";
import { signUp } from "../../lib/usecase/mutation/signUp";
import { CommentEntity } from "./../../lib/entity/comment";

export const Mutation: Resolvers["Mutation"] = {
  signUp,
  createTopic: async (_parent, args, context) => {
    authorize(context);

    const { title, content } = args.input;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = TopicEntity.create({ title, content, userId: uid });
    const { id } = await topicsCollection.dataRef.add(topic);
    return topicsCollection.loader.load(id);
  },

  updateTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { title, content } = args.input;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.loader.load(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");
    const editedTopic = TopicEntity.edit(topic, { title, content });
    await editedTopic.ref.set(editedTopic);
    return editedTopic;
  },

  deleteTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.loader.load(id);
    if (!TopicEntity.isCreatedBy(topic, { userId: uid })) throw new Error("Cannot write topic");
    await topic.ref.delete();
    return topic;
  },

  createComment: async (_parent, args, context) => {
    authorize(context);

    const { content, parentType, parentId } = args.input;
    const { uid } = context;
    const { topicsCollection, commentsCollection } = context.collections;

    if (parentType === "Topic") {
      const topic = await topicsCollection.loader.load(parentId);
      const commentData = CommentEntity.create({ content, parentType, parentId, userId: uid });
      await commentsCollection.dataRef({ topicId: topic.id }).add(commentData);
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
    const { commentsGroupCollection } = context.collections;

    const comment = await commentsGroupCollection.loader.load(id);
    if (!CommentEntity.isCreatedBy(comment, { userId: uid })) throw new Error("Cannot write comment");
    const editedComment = CommentEntity.edit(comment, { content });
    await editedComment.ref.set(editedComment);
    return editedComment;
  },

  deleteComment: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { topicsCollection, commentsGroupCollection } = context.collections;

    const comment = await commentsGroupCollection.loader.load(id);
    if (!CommentEntity.isCreatedBy(comment, { userId: uid })) throw new Error("Cannot write comment");
    await comment.ref.delete();

    if (comment.parentType === "Topic") {
      return topicsCollection.loader.load(comment.parentId);
    }

    throw new Error("rootId and parentId do not match");
  },
};
