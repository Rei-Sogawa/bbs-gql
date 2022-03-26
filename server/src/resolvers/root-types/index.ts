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

  comments: async (parent) => {
    return parent.commentsCollection.findAll({});
  },
};

export const CommentParent: Resolvers["CommentParent"] = {
  __resolveType(obj) {
    return obj.__name === "topic" ? "Topic" : "Comment";
  },
};
