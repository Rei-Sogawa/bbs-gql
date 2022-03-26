import { authorize } from "../../core/authorization/authorize";
import { CommentDoc, UserDoc } from "../../fire/doc";
import { Resolvers } from "../../graphql/generated";
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

    const topicData = TopicDoc.new({ title, content, userId: uid });
    const { id } = await topicsCollection.insert(topicData);
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
    await topic.recursiveDelete();
    return { id: topic.id, ...topic.toData() };
  },

  createComment: async (_parent, args, context) => {
    authorize(context);

    const { content, parentName, parentId } = args.input;
    const { uid } = context;
    const { topicsCollection, commentsCollectionGroup } = context.collections;

    const parent =
      parentName === "topic"
        ? await topicsCollection.findOneById(parentId, TopicDoc.of)
        : await commentsCollectionGroup.findOneById(parentId, CommentDoc.of);

    const commentData = CommentDoc.new({ content, userId: uid, parentName, parentId });
    await parent.commentsCollection.insert({ id: commentData.__id, ...commentData });
    return { id: parent.id, ...parent.toData() };
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
    await comment.recursiveDelete();

    if (comment.parentName === "topic") {
      return topicsCollection.findOneById(comment.parentId);
    } else if (comment.parentName === "comment") {
      return commentsCollectionGroup.findOneById(comment.parentId);
    }

    throw new Error("Reach bottom of deleteComment");
  },
};
