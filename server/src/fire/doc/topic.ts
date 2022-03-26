import { z } from "zod";

import { now } from "../../util/now";
import { CommentsCollection } from "../collection";
import { Doc } from "../lib/document";
import { DocSnap, WithId } from "../lib/type";

export const TopicDataSchema = z
  .object({
    __name: z.literal("topic"),
    title: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
  })
  .strict();

export type TopicData = z.infer<typeof TopicDataSchema>;

export type TopicMapper = WithId<TopicData>;

export class TopicDoc extends Doc<TopicData> implements TopicData {
  __name!: "topic";
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
      __name: "topic",
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
