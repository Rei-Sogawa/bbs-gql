import { hasPath } from "ramda";

import { TopicDoc } from "../../fire/document";
import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(userId).then((snap) => {
      const data = snap.data();
      if (!data) throw new Error("Not found data");
      return { id: snap.id, ...data };
    });
  },

  comments: async (parent, _args, context) => {
    const { topicsCollection } = context.collections;

    const topicSnap = await topicsCollection.findOneById(parent.id);
    const topic = new TopicDoc(topicSnap);
    return topic.comments.findAll();
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
