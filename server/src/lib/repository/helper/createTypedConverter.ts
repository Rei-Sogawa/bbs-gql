import is from "@sindresorhus/is";
import * as admin from "firebase-admin";
import { map, mapObjIndexed } from "ramda";

export const createTypedConverter = <TData>(): admin.firestore.FirestoreDataConverter<TData> => ({
  fromFirestore: (snap) => {
    return snap.data() as TData;
  },
  toFirestore: (data) => {
    return data;
  },
});

const decodeTimestampToDate = (input: unknown): any => {
  if (input instanceof admin.firestore.Timestamp) return input.toDate();

  if (input instanceof admin.firestore.FieldValue) return input;
  if (is.primitive(input)) return input; // NOTE: primitive : null, undefined, string, number, boolean, symbol
  if (is.array(input)) return map(decodeTimestampToDate, input);
  if (is.object(input)) return mapObjIndexed(decodeTimestampToDate, input);
  throw new Error("could not decodeTimestampToDate");
};

const encodeDateToTimestamp = (input: unknown): any => {
  if (input instanceof Date) return admin.firestore.Timestamp.fromDate(input);

  if (input instanceof admin.firestore.FieldValue) return input;
  if (is.primitive(input)) return input;
  if (is.array(input)) return map(encodeDateToTimestamp, input);
  if (is.object(input)) return mapObjIndexed(encodeDateToTimestamp, input);
  throw new Error("could not encodeDateToTimestamp");
};

export const createTimestampConverter = <TData>(): admin.firestore.FirestoreDataConverter<TData> => ({
  fromFirestore: (snap) => {
    const data = snap.data();
    return decodeTimestampToDate(data) as TData;
  },
  toFirestore: (data) => {
    return encodeDateToTimestamp(data);
  },
});
