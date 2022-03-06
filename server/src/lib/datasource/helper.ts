import { FirestoreDataConverter, Timestamp } from "../my-firebase-admin";

export const Converter = <TDoc>(): FirestoreDataConverter<TDoc> => ({
  toFirestore: (data) => data,
  fromFirestore: (snap) => snap.data() as TDoc,
});

const symbolMatch = /^\$\$Timestamp\$\$:/;

export const reviver = (_key: string, value: any) => {
  if (symbolMatch.test(value)) {
    const split = value.split(":");
    return new Timestamp(parseInt(split[1], 10), parseInt(split[2], 10));
  }
  return value;
};

export const replacer = (_key: string, value: any) => {
  if (value instanceof Timestamp) return `$$Timestamp$$:${value.seconds}:${value.nanoseconds}`;
  return value;
};
