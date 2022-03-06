import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";

import { CollectionReference } from "../my-firebase-admin";

type DocField = {
  id: string;
};

export class FirestoreDataSource<
  TDoc extends DocField,
  TContext = any
> extends DataSource<TContext> {
  context?: TContext;
  cache!: KeyValueCache;
  collection: CollectionReference<TDoc>;

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    this.cache = cache ?? new InMemoryLRUCache();
  }

  constructor(collection: CollectionReference<TDoc>) {
    super();
    this.collection = collection;
  }
}
