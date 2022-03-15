import * as admin from "firebase-admin";
import { z } from "zod";

import { Entity } from "./entity";

const TopicSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
  userId: z.string().min(1),
});

export type TopicRaw = z.infer<typeof TopicSchema>;

export type TopicRawData = Omit<TopicRaw, "id">;

export class TopicEntity extends Entity<TopicRaw> {
  static new(value: Pick<TopicRaw, "title" | "description" | "userId">) {
    return new TopicEntity(value);
  }

  id = "";
  title = "";
  description = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();
  userId = "";

  constructor(value: Partial<TopicRaw>) {
    super();
    Object.assign(this, value);
  }

  toRaw() {
    const { ...raw } = this;
    return raw;
  }

  toRawData() {
    const { id, ...rawData } = this;
    return rawData;
  }

  edit(value: Pick<TopicRaw, "title" | "description">) {
    Object.assign(this, value, { updatedAt: admin.firestore.Timestamp.now() });
  }

  isCreatedBy(value: { userId: string }) {
    return this.userId === value.userId;
  }
}
