import * as admin from "firebase-admin";
import { omit } from "ramda";

import { createCollectionGroupLoader, createRootCollectionLoader, createSubCollectionLoader } from "./createLoader";

// NOTE: update は converter を通らない。converter で id の追加と削除をしているので、update は使わない

export const createRootCollectionRepository = <TEntity extends { id: string }>(
  ref: admin.firestore.CollectionReference<TEntity>
) => {
  const loader = createRootCollectionLoader<TEntity>(ref);

  const _get = (id: string) => loader.load(id);

  const _set = (entity: TEntity) =>
    ref
      .doc(entity.id)
      .set(entity)
      .then(() => entity);

  const _add = (entity: TEntity) => ref.add(entity).then(({ id }) => ({ ...entity, id }));

  const _delete = (entity: TEntity) =>
    ref
      .doc(entity.id)
      .delete()
      .then(() => entity);

  return {
    ref,
    loader,
    get: _get,
    set: _set,
    add: _add,
    update: _set,
    delete: _delete,
  };
};

export const createSubCollectionRepository = <TEntity extends { id: string; _id: string }, Key extends { id: string }>(
  ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<TEntity>
) => {
  const loader = createSubCollectionLoader(ref);

  const _get = (params: Key) => loader.load(params);

  const _set = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .doc(entity.id)
      .set(entity)
      .then(() => entity);

  const _delete = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .doc(entity.id)
      .delete()
      .then(() => entity);

  return {
    ref,
    loader,
    get: _get,
    set: _set,
    update: _set,
    delete: _delete,
  };
};

export const createCollectionGroupRepository = <TEntity extends { id: string; _id: string }>(
  ref: admin.firestore.CollectionGroup<TEntity>
) => {
  const loader = createCollectionGroupLoader(ref);

  const _get = (id: string) => loader.load(id).then(omit(["ref"])) as Promise<TEntity>;

  const _set = async (entity: TEntity) =>
    loader
      .load(entity.id)
      .then((doc) => doc.ref.set(entity))
      .then(() => entity);

  const _delete = (entity: TEntity) =>
    loader
      .load(entity.id)
      .then((doc) => doc.ref.delete())
      .then(() => entity);

  return {
    ref,
    loader,
    get: _get,
    set: _set,
    update: _set,
    delete: _delete,
  };
};
