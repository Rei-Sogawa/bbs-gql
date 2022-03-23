import { CommentData, TopicData, UserData } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";

export class UsersCollection extends Collection<UserData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
}

export class TopicsCollection extends Collection<TopicData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc"));
  }
}

export class CommentsCollection extends Collection<CommentData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "asc"));
  }
}
