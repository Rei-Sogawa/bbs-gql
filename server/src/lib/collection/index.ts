import * as admin from "firebase-admin";

import { IUser, IUserData } from "../entity/user";
import { createDataConverter, createEntityConverter } from "./helper/createConverter";
import {
  createGroupCollectionLoader,
  createRootCollectionLoader,
  createSubCollectionLoader,
} from "./helper/createLoader";

type Db = admin.firestore.Firestore;
type DocRef<T> = admin.firestore.DocumentReference<T>;
type CollectionRef = admin.firestore.CollectionReference;
type CollectionGroup = admin.firestore.CollectionGroup;

const createRootCollection = <TData extends Record<string, any>, TEntity extends { id: string; ref: DocRef<TEntity> }>(
  collectionRef: CollectionRef
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const ref = collectionRef.withConverter(_dataConv);
  const loader = createRootCollectionLoader(collectionRef.withConverter(_entityConv));

  return {
    ref,
    loader,
  };
};

const createSubCollection = <
  TData extends Record<string, any>,
  TEntity extends { id: string; ref: DocRef<TEntity>; _id: string },
  Key extends { id: string }
>(
  collectionRef: (params: Omit<Key, "id">) => CollectionRef
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const ref = (params: Omit<Key, "id">) => collectionRef(params).withConverter(_dataConv);
  const loader = createSubCollectionLoader((params: Omit<Key, "id">) =>
    collectionRef(params).withConverter(_entityConv)
  );

  return {
    ref,
    loader,
  };
};

const createGroupCollection = <
  TData extends Record<string, any>,
  TEntity extends { id: string; ref: DocRef<TEntity>; _id: string }
>(
  collectionRef: CollectionGroup
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const ref = collectionRef.withConverter(_dataConv);
  const loader = createGroupCollectionLoader(collectionRef.withConverter(_entityConv));

  return {
    ref,
    loader,
  };
};

export const createCollections = (db: Db) => {
  const usersCollection = createRootCollection<IUserData, IUser>(db.collection("users"));

  return { usersCollection };
};

export type Collections = ReturnType<typeof createCollections>;
