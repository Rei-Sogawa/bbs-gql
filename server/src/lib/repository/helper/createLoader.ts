import DataLoader from "dataloader";
import * as admin from "firebase-admin";

export type RootCollectionLoader<IData> = DataLoader<string, IData & { id: string }>;
export const createRootCollectionLoader = <IData>(ref: admin.firestore.CollectionReference<IData>) => {
  return new DataLoader<string, IData & { id: string }>((keys) =>
    Promise.all(
      keys.map(async (id) => {
        const dSnap = await ref.doc(id).get();
        const data = dSnap.data();
        if (!data) throw new Error(`data not found at ${dSnap.ref.path}`);
        return { id: dSnap.id, ...data };
      })
    )
  );
};

export type SubCollectionLoader<IData, Key extends { id: string }> = DataLoader<Key, IData & { id: string }>;
export const createSubCollectionLoader = <IData, Key extends { id: string }>(
  ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<IData>
) => {
  return new DataLoader<Key, IData & { id: string }>((keys) =>
    Promise.all(
      keys.map(async (key) => {
        const { id, ...params } = key;
        const dSnap = await ref(params).doc(id).get();
        const data = dSnap.data();
        if (!data) throw new Error(`data not found at ${dSnap.ref.path}`);
        return { id: dSnap.id, ...data };
      })
    )
  );
};
