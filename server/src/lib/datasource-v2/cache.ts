import { KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { replacer } from "./../datasource/firestore-datasource/helper";
import { reviver } from "./helper";

type FindArgs = { ttlInSeconds: number };

export const createCacheMethods = <TDoc>({ cache }: { cache: KeyValueCache }) => {
  const findOne = async (
    docRef: admin.firestore.DocumentReference<TDoc>,
    args?: FindArgs
  ): Promise<TDoc> => {
    const key = docRef.path;
    const cacheDoc = await cache.get(key);
    if (cacheDoc && args?.ttlInSeconds) return JSON.parse(cacheDoc, reviver) as TDoc;

    const dSnap = await docRef.get();
    const doc = dSnap.data();
    if (!doc) throw new Error(`could not find doc by ${key}`);
    if (args?.ttlInSeconds)
      await cache.set(key, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    return doc;
  };

  const findManyByQuery = async (
    query: admin.firestore.Query<TDoc>,
    args?: FindArgs
  ): Promise<TDoc[]> => {
    const qSnap = await query.get();
    const dSnaps = qSnap.docs;
    for (const dSnap of dSnaps) {
      const key = dSnap.ref.path;
      const doc = dSnap.data();
      if (args?.ttlInSeconds)
        await cache.set(key, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    }
    return dSnaps.map((dSnap) => dSnap.data());
  };

  return {
    findOne,
    findManyByQuery,
  };
};
