import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { replacer, reviver } from "./helper";

type FindArgs = {
  ttl?: number; // NOTE: second
};

export type DocField = {
  id: string;
};

export type ICachedMethods<TDoc> = {
  cache: KeyValueCache;
  findOne: (id: string, args?: FindArgs) => Promise<TDoc>;
  findMany: (ids: string[], args?: FindArgs) => Promise<TDoc[]>;
  deleteFromCacheById: (id: string) => Promise<void>;
};

export const CachedMethods = <TDoc extends DocField>(
  collection: admin.firestore.CollectionReference<TDoc>,
  cache: KeyValueCache
): ICachedMethods<TDoc> => {
  const cacheKeyPrefix = `firestore-${collection.path}-`;

  const loader = new DataLoader<string, TDoc>((ids) =>
    Promise.all(
      ids.map((id) =>
        collection
          .doc(id)
          .get()
          .then((doc) => {
            const data = doc.data();
            if (!data) throw new Error(`could not find doc (id: ${doc.id})`);
            return data;
          })
      )
    )
  );

  const findOne = async (id: string, args?: FindArgs): Promise<TDoc> => {
    const key = cacheKeyPrefix + id;

    const cacheDoc = await cache.get(key);
    if (cacheDoc && args?.ttl) return JSON.parse(cacheDoc, reviver) as TDoc;

    const doc = await loader.load(id);
    if (Number.isInteger(args?.ttl))
      await cache.set(key, JSON.stringify(doc, replacer), { ttl: args?.ttl });
    return doc;
  };

  const findMany = async (ids: string[], args?: FindArgs): Promise<TDoc[]> => {
    return Promise.all(ids.map((id) => findOne(id, args)));
  };

  const deleteFromCacheById = async (id: string) => {
    const key = cacheKeyPrefix + id;
    loader.clear(id);
    await cache.delete(key);
  };

  return { cache, findOne, findMany, deleteFromCacheById };
};
