import { TopicsCollection, UsersCollection } from "./collection/index";
import { Firestore } from "./lib/type";

export const createCollections = (db: Firestore) => {
  const usersRef = db.collection("users");
  const topicsRef = db.collection("topics");

  const usersCollection = new UsersCollection(usersRef);
  const topicsCollection = new TopicsCollection(topicsRef);

  return { usersCollection, topicsCollection };
};

export type Collections = ReturnType<typeof createCollections>;
