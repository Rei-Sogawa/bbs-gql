import * as admin from "firebase-admin";

import { TopicRawData } from "../entity/topic";
import { createTypedConverter } from "./helper/createTypedConverter";
import { RootCollectionRepository } from "./repository";

export class TopicRepository extends RootCollectionRepository<TopicRawData> {
  constructor(db: admin.firestore.Firestore) {
    const ref = db.collection("topics").withConverter(createTypedConverter<TopicRawData>());
    super(ref);
  }

  findAll() {
    return this.ref
      .orderBy("createdAt", "desc")
      .get()
      .then((snap) => snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }
}
