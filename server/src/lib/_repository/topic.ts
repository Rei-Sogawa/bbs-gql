import * as admin from "firebase-admin";

import { TopicData } from "../entity/topic";
import { createTypedConverter } from "./createTypedConverter";
import { RootCollectionRepository } from "./repository";

export class TopicRepository extends RootCollectionRepository<TopicData> {
  constructor(db: admin.firestore.Firestore) {
    const ref = db.collection("users").withConverter(createTypedConverter<TopicData>());
    super(ref);
  }
}
