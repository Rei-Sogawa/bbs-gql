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

type FieldValue = admin.firestore.FieldValue;
type FieldPath = admin.firestore.FieldPath;
type WhereFilterOp = admin.firestore.WhereFilterOp;

type QueryOptions = Partial<{
  startAt: FieldValue[];
  startAfter: FieldValue[];
  endAt: FieldValue[];
  endBefore: FieldValue[];
  limit: number;
  where: [string | FieldPath, WhereFilterOp, any][];
}>;

type FindOneById<T> = (id: string, args: FindArgs) => Promise<T>;
type FindManyByIds<T> = (ids: string[], args: FindArgs) => Promise<T[]>;
type Query<T> = (options: QueryOptions, args: FindArgs) => Promise<T[]>;
type DeleteFromCacheById = (id: string) => Promise<void>;

const defaultOptions: QueryOptions = {
  startAt: undefined,
  startAfter: undefined,
  endAt: undefined,
  endBefore: undefined,
  limit: undefined,
  where: undefined,
};

type CachedMethods<T> = {
  findOneById: FindOneById<T>;
  findManyByIds: FindManyByIds<T>;
  query: Query<T>; // TODO: 取得結果の id にもとづきキャッシュする？
  deleteFromCacheById: DeleteFromCacheById;
};
