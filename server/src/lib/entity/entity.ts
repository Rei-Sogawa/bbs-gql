export class Entity<Raw> {
  id = "";

  constructor(value: Partial<Raw>) {
    Object.assign(this, value);
  }

  toRaw() {
    const { ...props } = this;
    return props;
  }

  toRawData() {
    const { ...props } = this;
    const { id: _id, ...data } = props;
    return data;
  }
}
