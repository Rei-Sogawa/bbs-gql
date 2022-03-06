import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { replacer, reviver } from "./helper";

type FindArgs = {
  ttl?: number;
};

export type DocField = {
  id: string;
};

export type ICachedMethods<TDoc> = {
  cache: KeyValueCache;
  findOne: (id: string, args: FindArgs) => Promise<TDoc>;
};

export const CachedMethods = <TDoc extends DocField>(
  collection: admin.firestore.CollectionReference<TDoc>,
  cache: KeyValueCache
): ICachedMethods<TDoc> => {
  const loader = new DataLoader<string, TDoc>((ids) =>
    Promise.all(
      ids.map((id) =>
        collection
          .doc(id)
          .get()
          .then((doc) => {
            const data = doc.data();
            if (!data) throw new Error("could not find doc");
            return data;
          })
      )
    )
  );

  const findOne = async (id: string, { ttl }: FindArgs): Promise<TDoc> => {
    const cacheDoc = await cache.get(id);
    if (cacheDoc && ttl) return JSON.parse(cacheDoc, reviver) as TDoc;

    const doc = await loader.load(id);
    if (Number.isInteger(ttl)) await cache.set(id, JSON.stringify(doc, replacer), { ttl });
    return doc;
  };

  return { cache, findOne };
};
