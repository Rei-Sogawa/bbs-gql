import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { Ref } from ".";
import { replacer, reviver } from "./helper";

type FindArgs = { ttlInSeconds: number };

export type FindOne<TDoc, TParams> = (
  docRefFn: (ref: Ref<TDoc, TParams>) => admin.firestore.DocumentReference<TDoc>,
  args?: FindArgs
) => Promise<TDoc>;

export type FindMany<TDoc, TParams> = (
  queryFn: (ref: Ref<TDoc, TParams>) => admin.firestore.Query<TDoc>,
  args?: FindArgs
) => Promise<TDoc[]>;

export type DeleteFromCache<TDoc, TParams> = (
  docRefFn: (ref: Ref<TDoc, TParams>) => admin.firestore.DocumentReference<TDoc>
) => Promise<void>;

export const createCacheMethods = <TDoc, TParams>({
  ref,
  cache,
}: {
  ref: Ref<TDoc, TParams>;
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

  const findOne: FindOne<TDoc, TParams> = async (docRefFn, args?) => {
    const docRef = docRefFn(ref);
    const cacheDoc = await cache.get(docRef.path);
    if (cacheDoc && args?.ttlInSeconds) return JSON.parse(cacheDoc, reviver) as TDoc;

    const doc = await loader.load(docRef);
    if (args?.ttlInSeconds)
      await cache.set(docRef.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    return doc;
  };

  const findMany: FindMany<TDoc, TParams> = async (queryFn, args?) => {
    const qSnap = await queryFn(ref).get();
    const qdSnaps = qSnap.docs;

    for (const qdSnap of qdSnaps) {
      const doc = qdSnap.data();

      loader.prime(qdSnap.ref, doc);
      if (args?.ttlInSeconds)
        await cache.set(qdSnap.ref.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    }

    return qdSnaps.map((qdSnap) => qdSnap.data());
  };

  const deleteFromCache: DeleteFromCache<TDoc, TParams> = async (docRefFn) => {
    const docRef = docRefFn(ref);
    loader.clear(docRef);
    await cache.delete(docRef.path);
  };

  return {
    findOne,
    findMany,
    deleteFromCache,
  };
};
