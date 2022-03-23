import { v4 } from "uuid";
import { z } from "zod";

import { now } from "../../lib/util/now";
import { CommentsCollection } from "../collection";
import { Doc } from "../lib/document";
import { DocSnap, WithId } from "../lib/type";

const UserDataSchema = z
  .object({
    displayName: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type UserData = z.infer<typeof UserDataSchema>;

export class UserDoc extends Doc<UserData> {
  displayName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(snap: DocSnap<UserData>) {
    super(snap, UserDataSchema.parse);
  }

  static of(snap: DocSnap<UserData>) {
    return new UserDoc(snap);
  }

  static new({ displayName }: Pick<UserData, "displayName">): UserData {
    const _now = now();
    return {
      displayName,
      createdAt: _now,
      updatedAt: _now,
    };
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

  static of(snap: DocSnap<TopicData>) {
    return new TopicDoc(snap);
  }

  get comments() {
    return new CommentsCollection(this.ref.collection("comments"));
  }

  static new({ title, content, userId }: Pick<TopicData, "title" | "content" | "userId">): TopicData {
    const _now = now();
    return {
      title,
      content,
      createdAt: _now,
      updatedAt: _now,
      userId,
    };
  }

  edit({ title, content }: Pick<TopicData, "title" | "content">) {
    Object.assign(this, { title, content, updatedAt: now() });
  }

  isCreatedBy({ userId }: { userId: string }) {
    return this.userId === userId;
  }
}

export type TopicMapper = WithId<TopicData>;

const CommentDataSchema = z
  .object({
    _id: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
    parentType: z.string().min(1),
    parentId: z.string().min(1),
  })
  .strict();

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

  static of(snap: DocSnap<CommentData>) {
    return new CommentDoc(snap);
  }

  get comments() {
    return new CommentsCollection(this.ref.collection("comments"));
  }

  static new({
    content,
    userId,
    parentType,
    parentId,
  }: Pick<CommentData, "content" | "userId" | "parentType" | "parentId">): CommentData {
    const _id = v4();
    const _now = now();
    return {
      _id,
      content,
      createdAt: _now,
      updatedAt: _now,
      userId,
      parentType,
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

export type CommentMapper = WithId<CommentData>;
