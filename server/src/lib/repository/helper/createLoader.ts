import DataLoader from "dataloader";
import * as admin from "firebase-admin";

export const createRootCollectionLoader = <T>(ref: admin.firestore.CollectionReference<T>) => {
  return new DataLoader<string, T>((keys) =>
    Promise.all(
      keys.map(async (id) => {
        const dSnap = await ref.doc(id).get();
        const data = dSnap.data();
        if (!data) throw new Error(`dSnap.data() not found by ${id}`);
        return data;
      })
    )
  );
};

export const createSubCollectionLoader = <T, Params extends Record<string, string>>(
  ref: (params: Params) => admin.firestore.CollectionReference<T>
) => {
  return new DataLoader<Params & { id: string }, T>((keys) =>
    Promise.all(
      keys.map(async (key) => {
        const { id, ...params } = key;
        const dSnap = await ref(params as unknown as Params)
          .doc(id)
          .get();
        const data = dSnap.data();
        if (!data) throw new Error(`dSnap.data() not found by ${JSON.stringify(key)}`);
        return data;
      })
    )
  );
};
