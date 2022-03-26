import { CommentData, CommentDataSchema, CommentDoc } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";

export class CommentsCollection extends Collection<CommentData, CommentDoc> {
  constructor(ref: CollectionRef) {
    super(ref, CommentDataSchema.parse, CommentDoc.of);
  }
  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "asc"));
  }
}
