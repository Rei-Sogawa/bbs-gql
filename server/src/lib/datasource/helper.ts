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

const symbolMatch = /^\$\$Timestamp\$\$:/;

export const reviver = (_key: string, value: any) => {
  if (symbolMatch.test(value)) {
    const split = value.split(":");
    return new admin.firestore.Timestamp(parseInt(split[1], 10), parseInt(split[2], 10));
  }
  return value;
};

export const replacer = (_key: string, value: any) => {
  if (value instanceof admin.firestore.Timestamp)
    return `$$Timestamp$$:${value.seconds}:${value.nanoseconds}`;
  return value;
};
