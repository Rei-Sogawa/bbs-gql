// import { DataSource } from "apollo-datasource";
// import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

// export class MyDataSource<TContext = any> extends DataSource {
//   context?: TContext;
//   cache!: KeyValueCache;

//   initialize({ context, cache }: { context?: TContext; cache?: KeyValueCache } = {}) {
//     this.context = context;
//     this.cache = cache || new InMemoryLRUCache();
//   }
// }

// const createCachedMethods = <T>({
//   collection,
//   cache,
// }: {
//   collection: admin.firestore.CollectionReference<T>;
//   cache: KeyValueCache;
// }) => {
//   return { cache };
// };

type FindArgs = { ttlInSeconds: number };

type FindOneById<T> = (id: string, args: FindArgs) => Promise<T>;
type FindManyByIds<T> = (ids: string[], args: FindArgs) => Promise<T[]>;
type DeleteFromCacheById = (id: string) => Promise<void>;

type CachedMethods<T> = {
  findOneById: FindOneById<T>;
  findManyByIds: FindManyByIds<T>;
  deleteFromCacheById: DeleteFromCacheById;
};
