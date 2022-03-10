import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { createCacheMethods, DeleteFromCache, FindManyByQuery, FindOne } from "./cache";

type Ref<TDoc, TParams> = (params: TParams) => admin.firestore.CollectionReference<TDoc>;

export class MyDataSource<
  TDoc,
  TParams extends Record<string, string> | void,
  TContext = any
> extends DataSource {
  context?: TContext;
  cache!: KeyValueCache;
  ref: Ref<TDoc, TParams>;
  findOne!: FindOne<TDoc>;
  findManyByQuery!: FindManyByQuery<TDoc>;
  deleteFromCache!: DeleteFromCache<TDoc>;

  constructor(ref: Ref<TDoc, TParams>) {
    super();
    this.ref = ref;
  }

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
    Object.assign(this, createCacheMethods({ cache: this.cache }));
  }
}
