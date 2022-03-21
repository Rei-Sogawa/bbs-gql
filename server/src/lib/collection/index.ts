import * as admin from "firebase-admin";

import { IUser, IUserData } from "../entity/user";
import { IComment, ICommentData } from "./../entity/comment";
import { ITopic, ITopicData } from "./../entity/topic";
import { createGroupCollection, createRootCollection, createSubCollection } from "./helper/createCollection";

type Db = admin.firestore.Firestore;

export const createCollections = (db: Db) => {
  const usersCollection = createRootCollection<IUserData, IUser>(db.collection("users"));
  const topicsCollection = createRootCollection<ITopicData, ITopic>(db.collection("topics"));
  const commentsCollection = createSubCollection<ICommentData, IComment, { topicId: string; id: string }>(
    ({ topicId }) => db.collection("topics").doc(topicId).collection("comments")
  );
  const nestCommentsCollection = createSubCollection<
    ICommentData,
    IComment,
    { topicId: string; commentId: string; id: string }
  >(({ topicId, commentId }) =>
    db.collection("topics").doc(topicId).collection("comments").doc(commentId).collection("comments")
  );
  const commentsGroupCollection = createGroupCollection<ICommentData, IComment>(db.collectionGroup("comments"));

  return { usersCollection, topicsCollection, commentsCollection, nestCommentsCollection, commentsGroupCollection };
};

export type Collections = ReturnType<typeof createCollections>;
