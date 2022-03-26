import { TopicDoc } from "../../fire/doc";
import { toMapper } from "./../../fire/lib/collection";
import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(userId, toMapper);
  },

  comments: async (parent, _args, context) => {
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.findOneById(parent.id, TopicDoc.of);
    return topic.commentsCollection.findAll();
  },
};

export const Comment: Resolvers["Comment"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(userId, toMapper);
  },

  comments: async (parent, _args, context) => {
    const { commentsCollectionGroup } = context.collections;

    const comment = await commentsCollectionGroup.findOneById(parent.id);
    return comment.commentsCollection.findAll();
  },
};

export const CommentParent: Resolvers["CommentParent"] = {
  __resolveType(obj) {
    return obj.__name === "topic" ? "Topic" : "Comment";
  },
};
