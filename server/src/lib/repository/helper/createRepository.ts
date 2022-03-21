import * as admin from "firebase-admin";

import { createRootCollectionLoader } from "./createLoader";

export const createRootCollectionRepository = <
  TData,
  TEntity extends { id: string; ref: admin.firestore.DocumentReference<TEntity> }
>(
  dataRef: admin.firestore.CollectionReference<TData>,
  entityRef: admin.firestore.CollectionReference<TEntity>
) => {
  const loader = createRootCollectionLoader<TEntity>(entityRef);
  const _get = (id: string) => loader.load(id);
  const _add = (data: TData) => dataRef.add(data);
  const _set = (id: string, data: TData) => dataRef.doc(id).set(data);

  return {
    dataRef,
    entityRef,
    loader,
    get: _get,
    add: _add,
    set: _set,
  };
};

// export const createSubCollectionRepository = <TEntity extends { id: string; _id: string }, Key extends { id: string }>(
//   ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<TEntity>
// ) => {
//   const loader = createSubCollectionLoader(ref);

//   const _get = (params: Key) => loader.load(params);

//   const _set = (params: Omit<Key, "id">, entity: TEntity) =>
//     ref(params)
//       .doc(entity.id)
//       .set(entity)
//       .then(() => entity);

//   const _delete = (params: Omit<Key, "id">, entity: TEntity) =>
//     ref(params)
//       .doc(entity.id)
//       .delete()
//       .then(() => entity);

//   return {
//     ref,
//     loader,
//     get: _get,
//     set: _set,
//     update: _set,
//     delete: _delete,
//   };
// };

// export const createCollectionGroupRepository = <TEntity extends { id: string; _id: string }>(
//   ref: admin.firestore.CollectionGroup<TEntity>
// ) => {
//   const loader = createCollectionGroupLoader(ref);

//   const _get = (id: string) => loader.load(id).then(omit(["ref"])) as Promise<TEntity>;

//   const _set = async (entity: TEntity) =>
//     loader
//       .load(entity.id)
//       .then((doc) => doc.ref.set(entity))
//       .then(() => entity);

//   const _delete = (entity: TEntity) =>
//     loader
//       .load(entity.id)
//       .then((doc) => doc.ref.delete())
//       .then(() => entity);

//   return {
//     ref,
//     loader,
//     get: _get,
//     set: _set,
//     update: _set,
//     delete: _delete,
//   };
// };
