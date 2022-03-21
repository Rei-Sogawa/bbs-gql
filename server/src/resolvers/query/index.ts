import { Resolvers } from "../../graphql/generated";
import { authorize } from "../../lib/authorization/authorize";

export const Query: Resolvers["Query"] = {
  me: (_parent, _args, context) => {
    authorize(context);

    const { uid } = context;
    const { usersCollection } = context.collections;

    return usersCollection.loader.load(uid);
  },

  topic: (_parent, args, context) => {
    const { id } = args;
    const { topicsCollection } = context.collections;

    return topicsCollection.loader.load(id);
  },

  topics: (_parent, _args, context) => {
    const { topicsCollection } = context.collections;

    return topicsCollection.entityRef
      .orderBy("createdAt", "desc")
      .get()
      .then((q) => q.docs.map((doc) => doc.data()));
  },
};
