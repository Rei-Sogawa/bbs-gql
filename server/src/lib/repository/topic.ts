import * as admin from "firebase-admin";

import { TopicData } from "../entity/topic";
import { createTypedConverter } from "./helper/createTypedConverter";
import { RootCollectionRepository } from "./repository";

export class TopicRepository extends RootCollectionRepository<TopicData> {
  constructor(db: admin.firestore.Firestore) {
    const ref = db.collection("topics").withConverter(createTypedConverter<TopicData>());
    super(ref);
  }

  findAll() {
    return this.ref
      .orderBy("createdAt", "desc")
      .get()
      .then((snap) => snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }
}
