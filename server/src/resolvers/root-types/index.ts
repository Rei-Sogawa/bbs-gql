import { hasPath } from "ramda";

import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.loader.load(userId);
  },

  comments: (parent, _args, context) => {
    const { commentsCollection } = context.collections;

    return commentsCollection
      .entityRef({ topicId: parent.id })
      .orderBy("createdAt", "asc")
      .get()
      .then((q) => q.docs.map((doc) => doc.data()));
  },
};

export const Comment: Resolvers["Comment"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.loader.load(userId);
  },
};

export const TopicOrComment: Resolvers["TopicOrComment"] = {
  __resolveType(obj) {
    if (hasPath(["rootId", "parentId"], obj)) {
      return "Comment";
    }
    return "Topic";
  },
};
