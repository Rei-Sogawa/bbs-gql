import { createConverter } from "./helper";
import {
  CollectionGroupRef,
  CollectionRef,
  Converter,
  DocField,
  DocRef,
  DocSnap,
  GroupDocFiled,
  Query,
  WithId,
  WriteResult,
} from "./type";

const mapper = <TData>(snap: DocSnap<TData>) => {
  const data = snap.data();
  if (!data) throw new Error("Data not found");
  return { id: snap.id, ...data };
};

export class Collection<TData extends DocField> {
  private _ref: CollectionRef<TData>;

  constructor(_ref: CollectionRef, _converter: Converter<TData> = createConverter<TData>()) {
    this._ref = _ref.withConverter(_converter);
  }

  findOneById(id: string): Promise<WithId<TData>>;
  findOneById<T>(id: string, decode: (snap: DocSnap<TData>) => T): Promise<T>;
  findOneById<T>(id: string, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode) return this._ref.doc(id).get().then(mapper);
    return this._ref.doc(id).get().then(decode);
  }

  findManyByQuery(queryFn: (ref: CollectionRef<TData>) => Query<TData>): Promise<WithId<TData>[]>;
  findManyByQuery<T>(
    queryFn: (ref: CollectionRef<TData>) => Query<TData>,
    decode: (snap: DocSnap<TData>) => T
  ): Promise<T[]>;
  findManyByQuery<T>(queryFn: (ref: CollectionRef<TData>) => Query<TData>, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return queryFn(this._ref)
        .get()
        .then((q) => q.docs.map(mapper));
    return queryFn(this._ref)
      .get()
      .then((q) => q.docs.map(decode));
  }

  insert(data: TData): Promise<DocRef<TData>>;
  insert(data: WithId<TData>): Promise<WriteResult>;
  insert(data: TData & { id?: string }) {
    const { id, ...__data } = data;
    const _data = __data as unknown as TData;
    return id ? this._ref.doc(id).set(_data) : this._ref.add(_data);
  }
}

export class CollectionGroup<TData extends GroupDocFiled> {
  private _ref: CollectionGroupRef<TData>;

  constructor(_ref: CollectionGroupRef, _converter: Converter<TData> = createConverter<TData>()) {
    this._ref = _ref.withConverter(_converter);
  }

  findOneById(id: string): Promise<WithId<TData>>;
  findOneById<T>(id: string, decode: (snap: DocSnap<TData>) => T): Promise<T>;
  findOneById<T>(id: string, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return this.findManyByQuery((ref) => ref.where("__id", "==", id)).then((docs) => {
        const doc = docs[0];
        if (!doc) throw new Error("Doc not found");
        return doc;
      });

    return this.findManyByQuery((ref) => ref.where("__id", "==", id), decode).then((docs) => {
      const doc = docs[0];
      if (!doc) throw new Error("Doc not found");
      return doc;
    });
  }

  findManyByQuery(queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>): Promise<WithId<TData>[]>;
  findManyByQuery<T>(
    queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>,
    decode: (snap: DocSnap<TData>) => T
  ): Promise<T[]>;
  findManyByQuery<T>(queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return queryFn(this._ref)
        .get()
        .then((q) => q.docs.map(mapper));

    return queryFn(this._ref)
      .get()
      .then((q) => q.docs.map(decode));
  }
}
