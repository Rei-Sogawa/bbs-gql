import { createConverter } from "./createConverter";
import { CollectionRef, Converter, Query } from "./type";

export class Collection<TData> {
  private _ref: CollectionRef<TData>;
  constructor(_ref: CollectionRef, converter: Converter<TData> = createConverter<TData>()) {
    this._ref = _ref.withConverter(converter);
  }
  findOneById(id: string) {
    return this._ref.doc(id).get();
  }
  findManyByQuery(queryFn: (ref: CollectionRef<TData>) => Query<TData>) {
    return queryFn(this._ref).get();
  }
  insert(data: (TData & { id?: undefined }) | (TData & { id: string })) {
    const { id, ..._data } = data;
    return id ? this._ref.doc(id).set(_data as unknown as TData) : this._ref.add(_data as unknown as TData);
  }
}
