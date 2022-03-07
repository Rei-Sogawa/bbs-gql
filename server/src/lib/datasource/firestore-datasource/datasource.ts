import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { CachedMethods, DocField, ICachedMethods } from "./cache";

export class FirestoreDataSource<TDoc extends DocField, TContext = any>
  extends DataSource<TContext>
  implements ICachedMethods<TDoc>
{
  collection: admin.firestore.CollectionReference<TDoc>;
  context?: TContext;
  cache!: ICachedMethods<TDoc>["cache"];
  findOne!: ICachedMethods<TDoc>["findOne"];
  findMany!: ICachedMethods<TDoc>["findMany"];
  deleteFromCacheById!: ICachedMethods<TDoc>["deleteFromCacheById"];
  primeLoader!: ICachedMethods<TDoc>["primeLoader"];

  constructor(collection: admin.firestore.CollectionReference<TDoc>) {
    super();
    this.collection = collection;
  }

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    const cachedMethods = CachedMethods<TDoc>(this.collection, cache ?? new InMemoryLRUCache());
    Object.assign(this, cachedMethods);
  }
}
