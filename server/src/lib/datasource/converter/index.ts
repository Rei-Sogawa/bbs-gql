import * as admin from "firebase-admin";

type Logger = {
  onRead: () => void;
  onWrite: () => void;
};

export const Converter = <TDoc>(options?: {
  logger?: Logger;
}): admin.firestore.FirestoreDataConverter<TDoc> => ({
  fromFirestore: (snap) => {
    options?.logger?.onRead();
    return snap.data() as TDoc;
  },
  toFirestore: (data) => {
    options?.logger?.onWrite();
    return data;
  },
});
