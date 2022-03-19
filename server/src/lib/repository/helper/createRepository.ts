import * as admin from "firebase-admin";

import { createRootCollectionLoader } from "./createLoader";

export const createRootCollectionRepository = <Entity extends { id: string }>(
  ref: admin.firestore.CollectionReference<Entity>
) => {
  const loader = createRootCollectionLoader<Entity>(ref);

  const _get = (id: string) => loader.load(id);

  const _set = (entity: Entity) =>
    ref
      .doc(entity.id)
      .set(entity)
      .then(() => entity);

  const _add = (entity: Entity) => ref.add(entity).then(({ id }) => ({ ...entity, id }));

  const _update = (entity: Entity) =>
    ref
      .doc(entity.id)
      .update(entity)
      .then(() => entity);

  const _delete = (entity: Entity) =>
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
