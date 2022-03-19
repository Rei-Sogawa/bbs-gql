import * as admin from "firebase-admin";

import { Topic } from "../entity/topic";
import { User } from "../entity/user";
import { createRootCollectionRepository } from "./../repository/helper/createRepository";
import { createTimestampConverter } from "./helper/createConverter";

export const createRepositories = (db: admin.firestore.Firestore) => {
  const usersRef = db.collection("users").withConverter(createTimestampConverter<User>());
  const topicsRef = db.collection("topics").withConverter(createTimestampConverter<Topic>());

  const UserRepository = createRootCollectionRepository<User>(usersRef);
  const TopicRepository = createRootCollectionRepository<Topic>(topicsRef);

  return { UserRepository, TopicRepository };
};

export type Repositories = ReturnType<typeof createRepositories>;
