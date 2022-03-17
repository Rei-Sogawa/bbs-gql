import * as admin from "firebase-admin";

import { UserData } from "../entity/user";
import { createTimestampConverter } from "./helper/createConverter";

export const createRepositories = (db: admin.firestore.Firestore) => {
  const usersRef = db.collection("users").withConverter(createTimestampConverter<UserData>());
  const topicsRef = db.collection("topics").withConverter(createTimestampConverter<TopicData>());
};

export type Repositories = ReturnType<typeof createRepositories>;
