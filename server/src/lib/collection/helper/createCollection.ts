import * as admin from "firebase-admin";

import { createDataConverter, createEntityConverter } from "./createConverter";
import { createGroupCollectionLoader, createRootCollectionLoader, createSubCollectionLoader } from "./createLoader";

type DocRef<T> = admin.firestore.DocumentReference<T>;
type CollectionRef = admin.firestore.CollectionReference;
type CollectionGroup = admin.firestore.CollectionGroup;

export const createRootCollection = <
  TData extends Record<string, any>,
  TEntity extends { id: string; ref: DocRef<TEntity> }
>(
  collectionRef: CollectionRef
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const dataRef = collectionRef.withConverter(_dataConv);
  const entityRef = collectionRef.withConverter(_entityConv);
  const loader = createRootCollectionLoader(entityRef);

  return {
    dataRef,
    entityRef,
    loader,
  };
};

export const createSubCollection = <
  TData extends Record<string, any>,
  TEntity extends { id: string; ref: DocRef<TEntity>; _id: string },
  Key extends { id: string }
>(
  collectionRef: (params: Omit<Key, "id">) => CollectionRef
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const dataRef = (params: Omit<Key, "id">) => collectionRef(params).withConverter(_dataConv);
  const entityRef = (params: Omit<Key, "id">) => collectionRef(params).withConverter(_entityConv);
  const loader = createSubCollectionLoader((params: Omit<Key, "id">) => entityRef(params));

  return {
    dataRef,
    entityRef,
    loader,
  };
};

export const createGroupCollection = <
  TData extends Record<string, any>,
  TEntity extends { id: string; ref: DocRef<TEntity>; _id: string }
>(
  collectionRef: CollectionGroup
) => {
  const _dataConv = createDataConverter<TData>();
  const _entityConv = createEntityConverter<TEntity>();

  const dataRef = collectionRef.withConverter(_dataConv);
  const entityRef = collectionRef.withConverter(_entityConv);
  const loader = createGroupCollectionLoader(entityRef);

  return {
    dataRef,
    entityRef,
    loader,
  };
};
