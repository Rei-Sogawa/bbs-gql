import { CommentData, CommentDoc } from "../doc";
import { CollectionGroup } from "../lib/collection";
import { CollectionGroupRef } from "../lib/type";

export class CommentsCollectionGroup extends CollectionGroup<CommentData, CommentDoc> {
  constructor(ref: CollectionGroupRef) {
    super(ref, CommentDoc.of);
  }
}
