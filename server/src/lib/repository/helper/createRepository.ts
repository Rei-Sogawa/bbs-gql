import * as admin from "firebase-admin";

import { createRootCollectionLoader, createSubCollectionLoader } from "./createLoader";

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

  const _update = (entity: TEntity) =>
    ref
      .doc(entity.id)
      .update(entity)
      .then(() => entity);

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
    update: _update,
    delete: _delete,
  };
};

export const createSubCollectionRepository = <TEntity extends { id: string }, Key extends { id: string }>(
  ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<TEntity>
) => {
  const loader = createSubCollectionLoader(ref);

  const _get = (params: Key) => loader.load(params);

  const _set = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .doc(entity.id)
      .set(entity)
      .then(() => entity);

  const _add = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .add(entity)
      .then(({ id }) => ({ ...entity, id }));

  const _update = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .doc(entity.id)
      .update(entity)
      .then(() => entity);

  const _delete = (params: Omit<Key, "id">, entity: TEntity) =>
    ref(params)
      .doc(entity.id)
      .delete()
      .then(() => entity);

  return {
    ref,
    loader,
    set: _set,
    get: _get,
    add: _add,
    update: _update,
    delete: _delete,
  };
};
