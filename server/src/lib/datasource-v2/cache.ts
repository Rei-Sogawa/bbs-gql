import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { replacer } from "./../datasource/firestore-datasource/helper";
import { reviver } from "./helper";

type FindArgs = { ttlInSeconds: number };

export const createCacheMethods = <TDoc>({
  ref,
  cache,
}: {
  ref: admin.firestore.CollectionReference<TDoc>;
  cache: KeyValueCache;
}) => {
  const loader = new DataLoader<admin.firestore.DocumentReference<TDoc>, TDoc, string>(
    async (docRefs) => {
      const dSnaps = await Promise.all(docRefs.map((docRef) => docRef.get()));
      return dSnaps.map((dSnap) => {
        const data = dSnap.data();
        if (!data) throw new Error(`could not find dSnap.data() at ${dSnap.ref.path}`);
        return data;
      });
    },
    { cacheKeyFn: (docRef) => docRef.path }
  );

  const findOne = async (id: string, args?: FindArgs): Promise<TDoc> => {
    const docRef = ref.doc(id);
    const cacheDoc = await cache.get(docRef.path);
    if (cacheDoc && args?.ttlInSeconds) return JSON.parse(cacheDoc, reviver) as TDoc;

    const doc = await loader.load(docRef);
    if (args?.ttlInSeconds)
      await cache.set(docRef.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    return doc;
  };

  const findManyByQuery = async (
    queryFn: (ref: admin.firestore.CollectionReference<TDoc>) => admin.firestore.Query<TDoc>,
    args?: FindArgs
  ): Promise<TDoc[]> => {
    const qSnap = await queryFn(ref).get();
    const qdSnaps = qSnap.docs;

    for (const qdSnap of qdSnaps) {
      const doc = qdSnap.data();
      if (!args?.ttlInSeconds) continue;
      await cache.set(qdSnap.ref.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    }

    return qdSnaps.map((qdSnap) => qdSnap.data());
  };

  const deleteFromCache = async (
    docRef: admin.firestore.DocumentReference<TDoc>
  ): Promise<void> => {
    loader.clear(docRef);
    await cache.delete(docRef.path);
  };

  return {
    findOne,
    findManyByQuery,
    deleteFromCache,
  };
};
