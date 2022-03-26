import { CommentData, TopicData, UserData } from "../doc";
import { Collection, CollectionGroup } from "../lib/collection";
import { CollectionGroupRef, CollectionRef } from "../lib/type";
import { CommentDataSchema, CommentDoc } from "./../doc/comment";
import { TopicDataSchema, TopicDoc } from "./../doc/topic";
import { UserDataSchema, UserDoc } from "./../doc/user";

export class UsersCollection extends Collection<UserData, UserDoc> {
  constructor(ref: CollectionRef) {
    super(ref, UserDataSchema.parse, UserDoc.of);
  }
}

export class TopicsCollection extends Collection<TopicData, TopicDoc> {
  constructor(ref: CollectionRef) {
    super(ref, TopicDataSchema.parse, TopicDoc.of);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc"));
  }
}

export class CommentsCollection extends Collection<CommentData, CommentDoc> {
  constructor(ref: CollectionRef) {
    super(ref, CommentDataSchema.parse, CommentDoc.of);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "asc"));
  }
}

export class CommentsCollectionGroup extends CollectionGroup<CommentData, CommentDoc> {
  constructor(ref: CollectionGroupRef) {
    super(ref, CommentDoc.of);
  }
}
