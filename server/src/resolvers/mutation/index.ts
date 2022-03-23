import { CommentDoc, UserDoc } from "../../fire/doc";
import { Resolvers } from "../../graphql/generated";
import { authorize } from "../../lib/authorization/authorize";
import { TopicDoc } from "./../../fire/doc/index";

export const Mutation: Resolvers["Mutation"] = {
  signUp: async (_parent, args, context) => {
    const { displayName, email, password } = args.input;
    const { auth } = context;
    const { usersCollection } = context.collections;

    const { uid } = await auth.createUser({ email, password });
    const userData = UserDoc.new({ displayName });
    await usersCollection.insert({ id: uid, ...userData });
    return usersCollection.findOneById(uid);
  },

  createTopic: async (_parent, args, context) => {
    authorize(context);

    const { title, content } = args.input;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = TopicDoc.new({ title, content, userId: uid });
    const { id } = await topicsCollection.insert(topic);
    return topicsCollection.findOneById(id);
  },

  updateTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { title, content } = args.input;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.findOneById(id, TopicDoc.of);
    if (!topic.isCreatedBy({ userId: uid })) throw new Error("Cannot write topic");
    topic.edit({ title, content });
    await topic.update();
    return { id: topic.id, ...topic.toData() };
  },

  deleteTopic: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.findOneById(id, TopicDoc.of);
    if (!topic.isCreatedBy({ userId: uid })) throw new Error("Cannot write topic");
    await topic.delete();
    return { id: topic.id, ...topic.toData() };
  },

  createComment: async (_parent, args, context) => {
    authorize(context);

    const { content, parentType, parentId } = args.input;
    const { uid } = context;
    const { topicsCollection } = context.collections;

    if (parentType === "Topic") {
      const topic = await topicsCollection.findOneById(parentId, TopicDoc.of);
      const newCommentData = CommentDoc.new({ content, userId: uid, parentType, parentId });
      await topic.comments.insert({ id: newCommentData._id, ...newCommentData });
      return { id: topic.id, ...topic.toData() };
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
    const { commentsCollectionGroup } = context.collections;

    const comment = await commentsCollectionGroup.findOneById(id, CommentDoc.of);
    if (!comment.isCreatedBy({ userId: uid })) throw new Error("Cannot write comment");
    comment.edit({ content });
    await comment.update();
    return { id: comment.id, ...comment.toData() };
  },

  deleteComment: async (_parent, args, context) => {
    authorize(context);

    const { id } = args;
    const { uid } = context;
    const { topicsCollection, commentsCollectionGroup } = context.collections;

    const comment = await commentsCollectionGroup.findOneById(id, CommentDoc.of);
    if (!comment.isCreatedBy({ userId: uid })) throw new Error("Cannot write comment");
    await comment.delete();

    if (comment.parentType === "Topic") {
      return topicsCollection.findOneById(comment.parentId);
    }

    throw new Error("rootId and parentId do not match");
  },
};
