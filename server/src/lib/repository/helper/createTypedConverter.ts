import * as admin from "firebase-admin";

export const createTypedConverter = <T>(): admin.firestore.FirestoreDataConverter<T> => ({
  fromFirestore: (snap) => {
    return snap.data() as T;
  },
  toFirestore: (data) => {
    return data;
  },
});
