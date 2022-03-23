import { z } from "zod";

import { Doc } from "./helper";
import { DocSnap } from "./helper/type";

const UserDataSchema = z.object({
  displayName: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserData = z.infer<typeof UserDataSchema>;

export class UserDoc extends Doc<UserData> implements UserDoc {
  displayName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(snap: DocSnap<UserData>) {
    super(snap, UserDataSchema.parse);
  }
}

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

export class TopicDoc extends Doc<TopicData> implements TopicData {
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;

  constructor(snap: DocSnap<TopicData>) {
    super(snap, TopicDataSchema.parse);
  }
}

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

export class CommentDoc extends Doc<CommentData> implements CommentData {
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
}
