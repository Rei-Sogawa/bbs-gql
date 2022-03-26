import { createConverter } from "./helper";
import { Converter, DocField, DocRef, DocSnap } from "./type";

export class Doc<TData extends DocField> {
  private _snap: DocSnap<TData>;
  private _ref: DocRef<TData>;
  private _parse: (data: unknown) => TData;

  constructor(
    _snap: DocSnap<TData>,
    _parse: (data: unknown) => TData,
    _converter: Converter<TData> = createConverter<TData>()
  ) {
    this._snap = _snap;
    this._ref = _snap.ref.withConverter(_converter);
    this._parse = _parse;
    const data = _snap.data();
    if (!data) throw new Error("Data not found");
    Object.assign(this, data);
  }

  get id() {
    return this._snap.id;
  }
  get ref() {
    return this._ref;
  }

  toPlainData() {
    const { _snap, _ref, _parse, ...props } = this;
    const data = Object.fromEntries(Object.entries(props).filter(([key]) => !key.toLowerCase().endsWith("collection")));
    return data;
  }
  toParsedData() {
    return this._parse(this.toPlainData());
  }
  toData() {
    return this.toParsedData();
  }

  update() {
    return this.ref.set(this.toParsedData());
  }
  delete() {
    return this.ref.delete();
  }
  recursiveDelete() {
    return this.ref.firestore.recursiveDelete(this.ref);
  }
}
