import { CommentsCollectionGroup, TopicsCollection, UsersCollection } from "./collection/index";
import { Firestore } from "./lib/type";

export const createCollections = (db: Firestore) => {
  const usersRef = db.collection("users");
  const topicsRef = db.collection("topics");
  const commentsRef = db.collectionGroup("comments");

  const usersCollection = new UsersCollection(usersRef);
  const topicsCollection = new TopicsCollection(topicsRef);
  const commentsCollectionGroup = new CommentsCollectionGroup(commentsRef);

  return { usersCollection, topicsCollection, commentsCollectionGroup };
};

export type Collections = ReturnType<typeof createCollections>;
