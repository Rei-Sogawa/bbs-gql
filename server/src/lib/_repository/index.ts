import * as admin from "firebase-admin";

import { TopicRepository } from "./topic";
import { UserRepository } from "./user";

export const createRepositories = (db: admin.firestore.Firestore) => ({
  userRepository: new UserRepository(db),
  topicRepository: new TopicRepository(db),
});

export type Repositories = ReturnType<typeof createRepositories>;
