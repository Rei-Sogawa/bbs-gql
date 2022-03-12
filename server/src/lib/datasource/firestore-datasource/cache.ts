import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { Ref } from ".";
import { replacer, reviver } from "./helper";

type WithId<TData> = { id: string } & TData;

type FindArgs = { ttlInSeconds: number };

export type FindOne<TData, TParams> = (
  docRefFn: (ref: Ref<TData, TParams>) => admin.firestore.DocumentReference<TData>,
  args?: FindArgs
) => Promise<WithId<TData>>;

export type FindMany<TData, TParams> = (
  queryFn: (ref: Ref<TData, TParams>) => admin.firestore.Query<TData>,
  args?: FindArgs
) => Promise<WithId<TData>[]>;

export type DeleteFromCache<TData, TParams> = (
  docRefFn: (ref: Ref<TData, TParams>) => admin.firestore.DocumentReference<TData>
) => Promise<void>;

export const createCacheMethods = <TData, TParams>({
  ref,
  cache,
}: {
  ref: Ref<TData, TParams>;
  cache: KeyValueCache;
}) => {
  const loader = new DataLoader<admin.firestore.DocumentReference<TData>, WithId<TData>, string>(
    async (docRefs) => {
      const dSnaps = await Promise.all(docRefs.map((docRef) => docRef.get()));
      return dSnaps.map((dSnap) => {
        const data = dSnap.data();
        if (!data) throw new Error(`could not find dSnap.data() at ${dSnap.ref.path}`);
        return { id: dSnap.id, ...data };
      });
    },
    { cacheKeyFn: (docRef) => docRef.path }
  );

  const findOne: FindOne<TData, TParams> = async (docRefFn, args?) => {
    const docRef = docRefFn(ref);
    const cacheDoc = await cache.get(docRef.path);
    if (cacheDoc && args?.ttlInSeconds) return JSON.parse(cacheDoc, reviver) as WithId<TData>;
    const doc = await loader.load(docRef);
    if (args?.ttlInSeconds) await cache.set(docRef.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    return doc;
  };

  const findMany: FindMany<TData, TParams> = async (queryFn, args?) => {
    const qSnap = await queryFn(ref).get();
    const qdSnaps = qSnap.docs;
    const res: WithId<TData>[] = [];

    for (const qdSnap of qdSnaps) {
      const data = qdSnap.data();
      const doc = { id: qdSnap.id, ...data };
      res.push(doc);

      loader.prime(qdSnap.ref, doc);
      if (args?.ttlInSeconds)
        await cache.set(qdSnap.ref.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    }

    return res;
  };

  const deleteFromCache: DeleteFromCache<TData, TParams> = async (docRefFn) => {
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
