import { CommentData, TopicData, UserData } from "../document";
import { Collection } from "./helper/index";
import { CollectionRef } from "./helper/type";

export class UsersCollection extends Collection<UserData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
}

export class TopicsCollection extends Collection<TopicData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
}

export class CommentsCollection extends Collection<CommentData> {
  constructor(ref: CollectionRef) {
    super(ref);
  }
}
