import { Firestore } from "./collection/helper/type";
import { TopicsCollection, UsersCollection } from "./collection/index";

export const createRootCollections = (db: Firestore) => {
  const usersRef = db.collection("users");
  const topicsRef = db.collection("topics");

  const usersCollection = new UsersCollection(usersRef);
  const topicsCollection = new TopicsCollection(topicsRef);

  return { usersCollection, topicsCollection };
};

export type RootCollections = ReturnType<typeof createRootCollections>;
