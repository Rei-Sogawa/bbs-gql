export class Entity {
  id = "";

  constructor(value: Partial<Entity>) {
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
