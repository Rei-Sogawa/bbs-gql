import * as admin from "firebase-admin";

export class Timestamp extends admin.firestore.Timestamp {}
export type FirestoreDataConverter<T> = admin.firestore.FirestoreDataConverter<T>;
export type CollectionReference<T> = admin.firestore.CollectionReference<T>;
