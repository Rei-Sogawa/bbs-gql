import { hasPath } from "ramda";

import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { UserRepository } = context.repositories;

    return UserRepository.get(userId);
  },

  comments: (parent, _args, context) => {
    const { CommentRepository } = context.repositories;

    return CommentRepository.findAll({ topicId: parent.id });
  },
};

export const Comment: Resolvers["Comment"] = {
  user: (parent, _args, context) => {
    const { userId } = parent;
    const { UserRepository } = context.repositories;

    return UserRepository.get(userId);
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
