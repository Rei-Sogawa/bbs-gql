import * as admin from "firebase-admin";
import { omit } from "ramda";

import { createRootCollectionLoader } from "./createLoader";

export const createRootCollectionRepository = <Entity extends { id: string }>(
  ref: admin.firestore.CollectionReference<Omit<Entity, "id">>
) => {
  const loader = createRootCollectionLoader<Omit<Entity, "id">>(ref);

  const _get = (id: string) => loader.load(id);
  const _set = (entity: Entity) => ref.doc(entity.id).set(omit(["id"], entity));
  const _add = (entity: Entity) => ref.add(omit(["id"], entity));
  const _update = (entity: Entity) => ref.doc(entity.id).update(omit(["id"], entity));
  const _delete = (entity: Entity) => ref.doc(entity.id).delete();

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
