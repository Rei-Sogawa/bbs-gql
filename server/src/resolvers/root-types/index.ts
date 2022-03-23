import { hasPath } from "ramda";

import { TopicDoc } from "../../fire/document";
import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(userId);
  },

  comments: async (parent, _args, context) => {
    const { topicsCollection } = context.collections;

    const topic = await topicsCollection.findOneById(parent.id, (snap) => new TopicDoc(snap));
    return topic.comments.findAll();
  },
};

export const Comment: Resolvers["Comment"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(userId);
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
