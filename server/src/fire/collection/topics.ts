import { TopicData, TopicDataSchema, TopicDoc } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";

export class TopicsCollection extends Collection<TopicData, TopicDoc> {
  constructor(ref: CollectionRef) {
    super(ref, TopicDataSchema.parse, TopicDoc.of);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc"));
  }
}
