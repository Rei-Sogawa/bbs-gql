import { DocSnap } from "./type";

export class Doc<TData> {
  private _snap: DocSnap<TData>;
  private _validate: (data: unknown) => TData;
  constructor(_snap: DocSnap<TData>, _validate: (data: unknown) => TData) {
    this._snap = _snap;
    this._validate = _validate;
    const data = _snap.data();
    if (!data) throw new Error("Data not found");
    Object.assign(this, _validate(data));
  }
  get id() {
    return this._snap.id;
  }
  get ref() {
    return this._snap.ref;
  }
  toData() {
    const { _snap, _validate, ...data } = this;
    return data;
  }
  validate() {
    this._validate(this.toData());
  }
  update() {
    const data = this._validate(this.toData());
    return this.ref.set(data);
  }
  delete() {
    return this.ref.delete();
  }
}
