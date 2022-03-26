import { CommentData, TopicData, UserData } from "../doc";
import { Collection, CollectionGroup } from "../lib/collection";
import { CollectionGroupRef, CollectionRef } from "../lib/type";
import { CommentDataSchema } from "./../doc/comment";
import { TopicDataSchema } from "./../doc/topic";
import { UserDataSchema } from "./../doc/user";

export class UsersCollection extends Collection<UserData> {
  constructor(ref: CollectionRef) {
    super(ref, UserDataSchema.parse);
  }
}

export class TopicsCollection extends Collection<TopicData> {
  constructor(ref: CollectionRef) {
    super(ref, TopicDataSchema.parse);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc"));
  }
}

export class CommentsCollection extends Collection<CommentData> {
  constructor(ref: CollectionRef) {
    super(ref, CommentDataSchema.parse);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "asc"));
  }
}

export class CommentsCollectionGroup extends CollectionGroup<CommentData> {
  constructor(ref: CollectionGroupRef) {
    super(ref);
  }
}
