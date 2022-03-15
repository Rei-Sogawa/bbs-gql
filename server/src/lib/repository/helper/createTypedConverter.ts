import * as admin from "firebase-admin";

export const createTypedConverter = <Data>(): admin.firestore.FirestoreDataConverter<Data> => ({
  fromFirestore: (snap) => {
    return snap.data() as Data;
  },
  toFirestore: (data) => {
    return data;
  },
});
