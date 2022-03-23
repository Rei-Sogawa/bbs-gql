import * as admin from "firebase-admin";

export type WithId<T> = T & { id: string };

export type Firestore = admin.firestore.Firestore;

export type DocumentData = admin.firestore.DocumentData;

export type DocRef<T = DocumentData> = admin.firestore.DocumentReference<T>;
export type DocSnap<T = DocumentData> = admin.firestore.DocumentSnapshot<T>;

export type CollectionRef<T = DocumentData> = admin.firestore.CollectionReference<T>;
export type CollectionGroupRef<T = DocumentData> = admin.firestore.CollectionGroup<T>;

export type Converter<T = DocumentData> = admin.firestore.FirestoreDataConverter<T>;

export type Query<T = DocumentData> = admin.firestore.Query<T>;
export type QueryDocSnap<T = DocumentData> = admin.firestore.QueryDocumentSnapshot<T>;

export type WriteResult = admin.firestore.WriteResult;
