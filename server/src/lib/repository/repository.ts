import DataLoader from "dataloader";
import * as admin from "firebase-admin";

import { createRootCollectionLoader } from "./helper/createLoader";

export class RootCollectionRepository<TRawData> {
  ref: admin.firestore.CollectionReference<TRawData>;
  loader: DataLoader<string, TRawData>;

  constructor(ref: admin.firestore.CollectionReference<TRawData>) {
    this.ref = ref;
    this.loader = createRootCollectionLoader(this.ref);
  }

  async findById(id: string) {
    try {
      const res = await this.loader.load(id);
      return { id, ...res };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async create(value: TRawData) {
    const { id } = await this.ref.add(value);
    return { id, ...value };
  }

  async update(value: { id: string } & TRawData) {
    await this.ref.doc(value.id).set(value);
    this.deleteCache(value.id);
    return value;
  }

  async delete(value: { id: string } & TRawData) {
    await this.ref.doc(value.id).delete();
    this.deleteCache(value.id);
    return value;
  }

  deleteCache(id: string) {
    this.loader.clear(id);
  }
}
