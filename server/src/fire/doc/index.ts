import { z } from "zod";

import { CommentsCollection } from "../collection";
import { Doc } from "../lib/document";
import { DocSnap, WithId } from "../lib/type";

const UserDataSchema = z.object({
  displayName: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserData = z.infer<typeof UserDataSchema>;

export class UserDoc extends Doc<UserData> {
  displayName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(snap: DocSnap<UserData>) {
    super(snap, UserDataSchema.parse);
  }
}

export type UserMapper = WithId<UserData>;

const TopicDataSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
  })
  .strict();

export type TopicData = z.infer<typeof TopicDataSchema>;

export class TopicDoc extends Doc<TopicData> {
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;

  constructor(snap: DocSnap<TopicData>) {
    super(snap, TopicDataSchema.parse);
  }

  get comments() {
    return new CommentsCollection(this.ref.collection("comments"));
  }
}

export type TopicMapper = WithId<TopicData>;

const CommentDataSchema = z.object({
  _id: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().min(1),
  parentType: z.string().min(1),
  parentId: z.string().min(1),
});

export type CommentData = z.infer<typeof CommentDataSchema>;

export class CommentDoc extends Doc<CommentData> {
  _id!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;
  parentType!: string;
  parentId!: string;

  constructor(snap: DocSnap<CommentData>) {
    super(snap, CommentDataSchema.parse);
  }

  get comments() {
    return new CommentsCollection(this.ref.collection("comments"));
  }
}

export type CommentMapper = WithId<CommentData>;
