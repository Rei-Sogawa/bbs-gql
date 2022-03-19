import { Resolvers } from "../../graphql/generated";
import { isLoggedIn } from "../../lib/authorization/isLoggedIn";

export const Query: Resolvers["Query"] = {
  me: (_parent, _args, context) => {
    isLoggedIn(context);

    const { uid } = context;
    const { UserRepository } = context.repositories;

    return UserRepository.get(uid);
  },

  topic: (_parent, args, context) => {
    const { id } = args;
    const { TopicRepository } = context.repositories;
    return TopicRepository.get(id);
  },

  topics: (_parent, _args, context) => {
    const { TopicRepository } = context.repositories;

    return TopicRepository.ref
      .orderBy("createdAt", "desc")
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data()));
  },
};
