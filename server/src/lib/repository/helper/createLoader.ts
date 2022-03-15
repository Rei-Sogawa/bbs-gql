import DataLoader from "dataloader";
import * as admin from "firebase-admin";

export const createRootCollectionLoader = <Data>(ref: admin.firestore.CollectionReference<Data>) => {
  return new DataLoader<string, Data>((keys) =>
    Promise.all(
      keys.map(async (id) => {
        const dSnap = await ref.doc(id).get();
        const data = dSnap.data();
        if (!data) throw new Error(`data not found at ${dSnap.ref.path}`);
        return data;
      })
    )
  );
};

export const createSubCollectionLoader = <Data, Key extends { id: string }>(
  ref: (params: Omit<Key, "id">) => admin.firestore.CollectionReference<Data>
) => {
  return new DataLoader<Key, Data>((keys) =>
    Promise.all(
      keys.map(async (key) => {
        const { id, ...params } = key;
        const dSnap = await ref(params).doc(id).get();
        const data = dSnap.data();
        if (!data) throw new Error(`data not found at ${dSnap.ref.path}`);
        return data;
      })
    )
  );
};
