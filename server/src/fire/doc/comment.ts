import { v4 } from "uuid";
import { z } from "zod";

import { now } from "../../util/now";
import { CommentsCollection } from "../collection";
import { Doc } from "../lib/document";
import { DocSnap, WithId } from "../lib/type";

const CommentDataSchema = z
  .object({
    __name: z.literal("comment"),
    __id: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
    parentName: z.string().min(1),
    parentId: z.string().min(1),
  })
  .strict();

export type CommentData = z.infer<typeof CommentDataSchema>;

export type CommentMapper = WithId<CommentData>;

export class CommentDoc extends Doc<CommentData> implements CommentData {
  __name!: "comment";
  __id!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;
  parentName!: string;
  parentId!: string;

  constructor(snap: DocSnap<CommentData>) {
    super(snap, CommentDataSchema.parse);
  }

  static of(snap: DocSnap<CommentData>) {
    return new CommentDoc(snap);
  }

  get comments() {
    return new CommentsCollection(this.ref.collection("comments"));
  }

  static new({
    content,
    userId,
    parentName,
    parentId,
  }: Pick<CommentData, "content" | "userId" | "parentName" | "parentId">): CommentData {
    const __id = v4();
    const _now = now();
    return {
      __name: "comment",
      __id,
      content,
      createdAt: _now,
      updatedAt: _now,
      userId,
      parentName,
      parentId,
    };
  }

  edit({ content }: Pick<CommentData, "content">) {
    Object.assign(this, { content, updatedAt: now() });
  }

  isCreatedBy({ userId }: { userId: string }) {
    return this.userId === userId;
  }
}
