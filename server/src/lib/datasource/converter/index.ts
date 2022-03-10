import * as admin from "firebase-admin";

import { FirestoreCounter } from "./../../../__spec__/test-util/counter";

export const Converter = <TDoc>(
  counter?: FirestoreCounter
): admin.firestore.FirestoreDataConverter<TDoc> => ({
  fromFirestore: (snap) => {
    counter?.onRead();
    return snap.data() as TDoc;
  },
  toFirestore: (data) => {
    counter?.onWrite();
    return data;
  },
});
