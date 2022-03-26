import { Doc } from "./document";
import { createConverter } from "./helper";
import { CollectionGroupRef, CollectionRef, Converter, DocField, DocSnap, GroupDocFiled, Query, WithId } from "./type";

export const toMapper = <TData>(snap: DocSnap<TData>) => {
  const data = snap.data();
  if (!data) throw new Error("Data not found");
  return { id: snap.id, ...data };
};

export class Collection<TData extends DocField, TDoc extends Doc<TData>> {
  private _ref: CollectionRef<TData>;
  private _parse: (data: unknown) => TData;
  private _of: (snap: DocSnap<TData>) => TDoc;

  constructor(
    _ref: CollectionRef,
    _parse: (data: unknown) => TData,
    _of: (snap: DocSnap<TData>) => TDoc,
    _converter: Converter<TData> = createConverter<TData>()
  ) {
    this._ref = _ref.withConverter(_converter);
    this._parse = _parse;
    this._of = _of;
  }

  findOneById(id: string): Promise<TDoc>;
  findOneById<T>(id: string, decode: (snap: DocSnap<TData>) => T): Promise<T>;
  findOneById<T>(id: string, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode) return this._ref.doc(id).get().then(this._of);
    return this._ref.doc(id).get().then(decode);
  }

  findManyByQuery(queryFn: (ref: CollectionRef<TData>) => Query<TData>): Promise<TDoc[]>;
  findManyByQuery<T>(
    queryFn: (ref: CollectionRef<TData>) => Query<TData>,
    decode: (snap: DocSnap<TData>) => T
  ): Promise<T[]>;
  findManyByQuery<T>(queryFn: (ref: CollectionRef<TData>) => Query<TData>, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return queryFn(this._ref)
        .get()
        .then((q) => q.docs.map(this._of));
    return queryFn(this._ref)
      .get()
      .then((q) => q.docs.map(decode));
  }

  insert(data: TData): Promise<TDoc>;
  insert(data: WithId<TData>): Promise<TDoc>;
  async insert(data: TData & { id?: string }) {
    const { id, ...__data } = data;
    const _data = this._parse(__data);
    if (id) {
      await this._ref.doc(id).set(_data);
      return this.findOneById(id);
    } else {
      const { id } = await this._ref.add(_data);
      return this.findOneById(id);
    }
  }
}

export class CollectionGroup<TData extends GroupDocFiled, TDoc extends Doc<TData>> {
  private _ref: CollectionGroupRef<TData>;
  private _of: (snap: DocSnap<TData>) => TDoc;

  constructor(
    _ref: CollectionGroupRef,
    _of: (snap: DocSnap<TData>) => TDoc,
    _converter: Converter<TData> = createConverter<TData>()
  ) {
    this._ref = _ref.withConverter(_converter);
    this._of = _of;
  }

  findOneById(id: string): Promise<TDoc>;
  findOneById<T>(id: string, decode: (snap: DocSnap<TData>) => T): Promise<T>;
  findOneById<T>(id: string, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return this.findManyByQuery((ref) => ref.where("__id", "==", id)).then((docs) => {
        const doc = docs.at(0);
        if (!doc) throw new Error("Doc not found");
        return doc;
      });

    return this.findManyByQuery((ref) => ref.where("__id", "==", id), decode).then((docs) => {
      const doc = docs.at(0);
      if (!doc) throw new Error("Doc not found");
      return doc;
    });
  }

  findManyByQuery(queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>): Promise<TDoc[]>;
  findManyByQuery<T>(
    queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>,
    decode: (snap: DocSnap<TData>) => T
  ): Promise<T[]>;
  findManyByQuery<T>(queryFn: (ref: CollectionGroupRef<TData>) => Query<TData>, decode?: (snap: DocSnap<TData>) => T) {
    if (!decode)
      return queryFn(this._ref)
        .get()
        .then((q) => q.docs.map(this._of));

    return queryFn(this._ref)
      .get()
      .then((q) => q.docs.map(decode));
  }
}
