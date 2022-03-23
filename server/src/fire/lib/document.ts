import { createConverter } from "./helper";
import { Converter, DocRef, DocSnap } from "./type";

export class Doc<TData extends { __name: string }> {
  private _snap: DocSnap<TData>;
  private _ref: DocRef<TData>;
  private _validate: (data: unknown) => TData;

  constructor(
    _snap: DocSnap<TData>,
    _validate: (data: unknown) => TData,
    _converter: Converter<TData> = createConverter<TData>()
  ) {
    this._snap = _snap;
    this._ref = _snap.ref.withConverter(_converter);
    this._validate = _validate;
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
    const { _snap, _ref, _validate, ...data } = this;
    return data as unknown;
  }
  toData() {
    return this._validate(this.toPlainData());
  }

  update() {
    return this.ref.set(this.toData());
  }
  delete() {
    return this.ref.delete();
  }
}
