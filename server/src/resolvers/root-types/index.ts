import { Resolvers } from "./../../graphql/generated";

export const Topic: Resolvers["Topic"] = {
  user: (parent, _args, context) => {
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(parent.userId);
  },

  comments: async (parent, args) => {
    return parent.commentsCollection.findAll(args.input);
  },
};

export const Comment: Resolvers["Comment"] = {
  user: (parent, _args, context) => {
    const { usersCollection } = context.collections;

    return usersCollection.findOneById(parent.userId);
  },

  comments: (parent) => {
    return parent.commentsCollection.findAll({});
  },

  parent: (parent, _args, context) => {
    const { topicsCollection, commentsCollectionGroup } = context.collections;

    return parent.parentName === "topic"
      ? topicsCollection.findOneById(parent.parentId)
      : commentsCollectionGroup.findOneById(parent.parentId);
  },
};

export const CommentParent: Resolvers["CommentParent"] = {
  __resolveType(obj) {
    return obj.__name === "topic" ? "Topic" : "Comment";
  },
};
