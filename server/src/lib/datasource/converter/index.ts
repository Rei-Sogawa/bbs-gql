import * as admin from "firebase-admin";

import { ConverterCounter } from "./../../../__spec__/test-util/counter";

export const Converter = <TData>(counter?: ConverterCounter): admin.firestore.FirestoreDataConverter<TData> => ({
  fromFirestore: (snap) => {
    counter?.onRead();
    return snap.data() as TData;
  },
  toFirestore: (data) => {
    counter?.onWrite();
    return data;
  },
});
