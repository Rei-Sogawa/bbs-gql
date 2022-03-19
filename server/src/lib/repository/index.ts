import * as admin from "firebase-admin";

import { Topic } from "../entity/topic";
import { User } from "../entity/user";
import { createRootCollectionRepository } from "./../repository/helper/createRepository";
import { createTimestampConverter } from "./helper/createConverter";

const createTopicRepository = (ref: admin.firestore.CollectionReference<Topic>) => {
  const repository = createRootCollectionRepository<Topic>(ref);
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
  const usersRef = db.collection("users").withConverter(createTimestampConverter<User>());
  const topicsRef = db.collection("topics").withConverter(createTimestampConverter<Topic>());

  const UserRepository = createRootCollectionRepository<User>(usersRef);
  const TopicRepository = createTopicRepository(topicsRef);

  return { UserRepository, TopicRepository };
};

export type Repositories = ReturnType<typeof createRepositories>;
