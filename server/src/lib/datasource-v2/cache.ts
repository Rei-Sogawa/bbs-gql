import { KeyValueCache } from "apollo-server-caching";
import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { replacer } from "./../datasource/firestore-datasource/helper";
import { reviver } from "./helper";

type FindArgs = { ttlInSeconds: number };

export const createCacheMethods = <TDoc>({
  db,
  cache,
}: {
  db: admin.firestore.Firestore;
  cache: KeyValueCache;
}) => {
  const loader = new DataLoader<string, TDoc>(async (docPaths) => {
    const dSnaps = await Promise.all(docPaths.map((docPath) => db.doc(docPath).get()));
    return dSnaps.map((dSnap) => {
      const data = dSnap.data();
      if (!data) throw new Error(`could not find dSnap.data() by ${dSnap.ref.path}`);
      return data as TDoc;
    });
  });

  const findOne = async (
    docRef: admin.firestore.DocumentReference<TDoc>,
    args?: FindArgs
  ): Promise<TDoc> => {
    const cacheDoc = await cache.get(docRef.path);
    if (cacheDoc && args?.ttlInSeconds) return JSON.parse(cacheDoc, reviver) as TDoc;

    const doc = await loader.load(docRef.path);
    if (!doc) throw new Error(`could not find doc by ${docRef.path}`);
    if (args?.ttlInSeconds)
      await cache.set(docRef.path, JSON.stringify(doc, replacer), { ttl: args.ttlInSeconds });
    return doc;
  };

  const findManyByQuery = async (
    query: admin.firestore.Query<TDoc>,
    args?: FindArgs
  ): Promise<TDoc[]> => {
    const qSnap = await query.get();
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
    loader.clear(docRef.path);
    await cache.delete(docRef.path);
  };

  return {
    findOne,
    findManyByQuery,
    deleteFromCache,
  };
};
