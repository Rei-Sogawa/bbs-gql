import * as admin from "firebase-admin";

export type DocRef<T> = admin.firestore.DocumentReference<T>;
export type CollectionRef<T> = admin.firestore.CollectionReference<T>;
