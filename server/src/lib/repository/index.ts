import * as admin from "firebase-admin";

import { IComment } from "../entity/comment";
import { ITopic } from "../entity/topic";
import { IUser } from "../entity/user";
import { createRootCollectionRepository, createSubCollectionRepository } from "./../repository/helper/createRepository";
import { createTimestampConverter } from "./helper/createConverter";

type CollectionRef<T> = admin.firestore.CollectionReference<T>;

const createTopicRepository = (ref: CollectionRef<ITopic>) => {
  const repository = createRootCollectionRepository(ref);
  return {
    ...repository,
    findAll: () =>
      ref
        .orderBy("createdAt", "desc")
        .get()
        .then((snap) => snap.docs.map((doc) => doc.data())),
  };
};

const createCommentRepository = (ref: ({ topicId }: { topicId: string }) => CollectionRef<IComment>) => {
  const repository = createSubCollectionRepository<IComment, { topicId: string; id: string }>(ref);
  return {
    ...repository,
    findAll: ({ topicId }: { topicId: string }) =>
      ref({ topicId })
        .orderBy("createdAt", "desc")
        .get()
        .then((snap) => snap.docs.map((doc) => doc.data())),
  };
};

export const createRepositories = (db: admin.firestore.Firestore) => {
  const usersRef = db.collection("users").withConverter(createTimestampConverter<IUser>());
  const topicsRef = db.collection("topics").withConverter(createTimestampConverter<ITopic>());

  const commentsRef = ({ topicId }: { topicId: string }) => {
    return db
      .collection("topics")
      .doc(topicId)
      .collection("comments")
      .withConverter(createTimestampConverter<IComment>());
  };

  const UserRepository = createRootCollectionRepository(usersRef);
  const TopicRepository = createTopicRepository(topicsRef);

  const CommentRepository = createCommentRepository(commentsRef);

  return { UserRepository, TopicRepository, CommentRepository };
};

export type Repositories = ReturnType<typeof createRepositories>;
