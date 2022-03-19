import * as admin from "firebase-admin";

import { ITopic } from "../entity/topic";
import { IUser } from "../entity/user";
import { createRootCollectionRepository } from "./../repository/helper/createRepository";
import { createTimestampConverter } from "./helper/createConverter";

const createTopicRepository = (ref: admin.firestore.CollectionReference<ITopic>) => {
  const repository = createRootCollectionRepository<ITopic>(ref);
  return {
    ...repository,
    findAll: () =>
      ref
        .orderBy("createdAt", "desc")
        .get()
        .then((snap) => snap.docs.map((doc) => doc.data())),
  };
};

export const createRepositories = (db: admin.firestore.Firestore) => {
  const usersRef = db.collection("users").withConverter(createTimestampConverter<IUser>());
  const topicsRef = db.collection("topics").withConverter(createTimestampConverter<ITopic>());

  const UserRepository = createRootCollectionRepository<IUser>(usersRef);
  const TopicRepository = createTopicRepository(topicsRef);

  return { UserRepository, TopicRepository };
};

export type Repositories = ReturnType<typeof createRepositories>;
