import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

type DocField = {
  id: string;
};

export class FirestoreDataSource<
  TDoc extends DocField,
  TContext = any
> extends DataSource<TContext> {
  context?: TContext;
  cache!: KeyValueCache;
  collection: admin.firestore.CollectionReference<TDoc>;

  initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
    this.context = context;
    this.cache = cache ?? new InMemoryLRUCache();
  }

  constructor(collection: admin.firestore.CollectionReference<TDoc>) {
    super();
    this.collection = collection;
  }
}
