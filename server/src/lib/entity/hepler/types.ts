import * as admin from "firebase-admin";

export type DocRef<T> = admin.firestore.DocumentReference<T>;
