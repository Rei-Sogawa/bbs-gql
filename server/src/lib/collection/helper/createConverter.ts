import is from "@sindresorhus/is";
import * as admin from "firebase-admin";
import { map, mapObjIndexed } from "ramda";

export const decodeTimestampToDate = (input: unknown): any => {
  if (input instanceof admin.firestore.Timestamp) return input.toDate();

  if (input instanceof admin.firestore.FieldValue) return input;
  if (input instanceof admin.firestore.DocumentReference) return input;
  if (input instanceof admin.firestore.CollectionReference) return input;
  if (is.primitive(input)) return input; // NOTE: primitive : null, undefined, string, number, boolean, symbol
  if (is.array(input)) return map(decodeTimestampToDate, input);
  if (is.object(input)) return mapObjIndexed(decodeTimestampToDate, input);
  throw new Error("could not decodeTimestampToDate");
};

export const encodeDateToTimestamp = (input: unknown): any => {
  if (input instanceof Date) return admin.firestore.Timestamp.fromDate(input);

  if (input instanceof admin.firestore.FieldValue) return input;
  if (input instanceof admin.firestore.DocumentReference) return input;
  if (input instanceof admin.firestore.CollectionReference) return input;
  if (is.primitive(input)) return input;
  if (is.array(input)) return map(encodeDateToTimestamp, input);
  if (is.object(input)) return mapObjIndexed(encodeDateToTimestamp, input);
  throw new Error("could not encodeDateToTimestamp");
};

export const createDataConverter = <
  TData extends Record<string, any>
>(): admin.firestore.FirestoreDataConverter<TData> => ({
  fromFirestore: (snap) => {
    return decodeTimestampToDate(snap.data()) as TData;
  },
  toFirestore: (data) => {
    return encodeDateToTimestamp(data);
  },
});

export const createEntityConverter = <
  TEntity extends { id: string; ref: admin.firestore.DocumentReference<TEntity> }
>(): admin.firestore.FirestoreDataConverter<TEntity> => ({
  fromFirestore: (snap) => {
    return decodeTimestampToDate({ id: snap.id, ref: snap.ref, ...snap.data() }) as TEntity;
  },
  toFirestore: (entity) => {
    const { id, ref, ...data } = entity;
    return encodeDateToTimestamp(data);
  },
});

export const createConverter = <TData extends Record<string, any>, TDecodedData extends TData>(
  decode: (snap: admin.firestore.DocumentSnapshot<TData>) => TDecodedData,
  encode: (decodedData: TDecodedData | Partial<TDecodedData>) => TData | Partial<TData>
): admin.firestore.FirestoreDataConverter<TDecodedData> => ({
  fromFirestore: (snap) => {
    return decode(snap as admin.firestore.DocumentSnapshot<TData>);
  },
  toFirestore: (data) => {
    return encode(data);
  },
});

export const decodeTimestamp = <T>(obj: T) =>
  mapObjIndexed((v) => (v instanceof admin.firestore.Timestamp ? v.toDate() : v), obj);

export const encodeDate = <T>(obj: T) =>
  mapObjIndexed((v) => (v instanceof Date ? admin.firestore.Timestamp.fromDate(v) : v), obj);
