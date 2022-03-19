import DataLoader from "dataloader";
import * as admin from "firebase-admin";

export const createRootCollectionLoader = <IEntity extends { id: string }>(
  ref: admin.firestore.CollectionReference<IEntity>
) => {
  return new DataLoader<string, IEntity>((keys) =>
    Promise.all(
      keys.map(async (id) => {
        const dSnap = await ref.doc(id).get();
        const entity = dSnap.data();
        if (!entity) throw new Error(`data not found at ${dSnap.ref.path}`);
        return entity;
      })
    )
  );
};

export const createSubCollectionLoader = <IEntity extends { id: string }, Key extends { id: string }>(
  ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<IEntity>
) => {
  return new DataLoader<Key, IEntity>((keys) =>
    Promise.all(
      keys.map(async (key) => {
        const { id, ...params } = key;
        const dSnap = await ref(params).doc(id).get();
        const entity = dSnap.data();
        if (!entity) throw new Error(`data not found at ${dSnap.ref.path}`);
        return entity;
      })
    )
  );
};
