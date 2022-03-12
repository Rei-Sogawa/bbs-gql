import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { createCacheMethods, DeleteFromCache, FindMany, FindOne } from "./cache";

export type Ref<TData, TParams> = (params: TParams) => admin.firestore.CollectionReference<TData>;

export class FirestoreDataSource<
  TData,
  TParams extends Record<string, string> | void,
  TContext = any
> extends DataSource {
  context?: TContext;
  cache!: KeyValueCache;
  ref: Ref<TData, TParams>;
  findOne!: FindOne<TData, TParams>;
  findMany!: FindMany<TData, TParams>;
  deleteFromCache!: DeleteFromCache<TData, TParams>;

  constructor(ref: Ref<TData, TParams>) {
    super();
    this.ref = ref;
  }

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
    Object.assign(this, createCacheMethods({ ref: this.ref, cache: this.cache }));
  }
}
