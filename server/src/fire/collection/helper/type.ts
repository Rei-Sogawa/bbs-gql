import * as admin from "firebase-admin";

type DocumentData = admin.firestore.DocumentData;
export type DocRef<T = DocumentData> = admin.firestore.DocumentReference<T>;
export type CollectionRef<T = DocumentData> = admin.firestore.CollectionReference<T>;
export type DocSnap<T = DocumentData> = admin.firestore.DocumentSnapshot<T>;
export type QueryDocSnap<T = DocumentData> = admin.firestore.QueryDocumentSnapshot<T>;
export type Converter<T = DocumentData> = admin.firestore.FirestoreDataConverter<T>;
export type Query<T = DocumentData> = admin.firestore.Query<T>;
export type Firestore = admin.firestore.Firestore;
export type WriteResult = admin.firestore.WriteResult;
