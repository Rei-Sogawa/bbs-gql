import * as admin from "firebase-admin";

import { TopicRawData } from "../entity/topic";
import { TopicEntity } from "./../entity/topic";
import { createRootCollectionLoader } from "./helper/createLoader";
import { createTypedConverter } from "./helper/createTypedConverter";
import { Repository } from "./repository";

export class TopicRepository extends Repository<TopicEntity> {
  topicsRef;
  topicLoader;

  constructor(db: admin.firestore.Firestore) {
    super();
    this.topicsRef = db.collection("topics").withConverter(createTypedConverter<TopicRawData>());
    this.topicLoader = createRootCollectionLoader(this.topicsRef);
  }

  findById(id: string) {
    return this.topicLoader.load(id).then((raw) => new TopicEntity(raw));
  }

  create(topic: TopicEntity) {
    return topic.id
      ? this.topicsRef
          .doc(topic.id)
          .set(topic.toRawData())
          .then(() => topic)
      : this.topicsRef.add(topic.toRawData()).then(({ id }) => new TopicEntity({ id, ...topic.toRawData() }));
  }

  update(topic: TopicEntity) {
    return this.topicsRef
      .doc(topic.id)
      .set(topic.toRawData())
      .then(() => topic);
  }

  delete(topic: TopicEntity) {
    return this.topicsRef
      .doc(topic.id)
      .delete()
      .then(() => topic);
  }

  findAll(): Promise<TopicEntity[]> {
    return this.topicsRef
      .orderBy("createdAt", "desc")
      .get()
      .then((qSnap) => qSnap.docs.map((doc) => new TopicEntity({ id: doc.id, ...doc.data() })));
  }
}
