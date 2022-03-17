import * as admin from "firebase-admin";
import { omit } from "ramda";

import { createRootCollectionLoader } from "./createLoader";

export const createRootCollectionRepository = <Entity extends { id: string }, Data>(
  ref: admin.firestore.CollectionReference<Data>
) => {
  const loader = createRootCollectionLoader(ref);

  const _get = loader.load;
  const _set = (entity: Entity) => ref.doc(entity.id).set(omit(["id"], entity) as unknown as Data);
  const _add = (entity: Entity) => ref.add(omit(["id"], entity) as unknown as Data);
  const _update = (entity: Entity) => ref.doc(entity.id).update(omit(["id"], entity) as unknown as Data);
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
