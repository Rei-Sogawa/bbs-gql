import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { createCacheMethods, DeleteFromCache, FindMany, FindOne } from "./cache";

export type Ref<TDoc, TParams> = (params: TParams) => admin.firestore.CollectionReference<TDoc>;

export class FirestoreDataSource<
  TDoc,
  TParams extends Record<string, string> | void,
  TContext = any
> extends DataSource {
  context?: TContext;
  cache!: KeyValueCache;
  ref: Ref<TDoc, TParams>;
  findOne!: FindOne<TDoc, TParams>;
  findMany!: FindMany<TDoc, TParams>;
  deleteFromCache!: DeleteFromCache<TDoc, TParams>;

  constructor(ref: Ref<TDoc, TParams>) {
    super();
    this.ref = ref;
  }

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
    Object.assign(this, createCacheMethods({ ref: this.ref, cache: this.cache }));
  }
}
