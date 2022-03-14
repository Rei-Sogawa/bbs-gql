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

export class TopicEntity extends Entity<TopicRaw> implements TopicRaw {
  title = "";
  description = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();
  userId = "";

  validate() {
    TopicSchema.parse(this.toRaw());
  }

  constructor(value: Partial<TopicRaw>) {
    super(value);
    Object.assign(this, value);
  }

  static new(value: Pick<TopicRaw, "title" | "description" | "userId">) {
    return new TopicEntity(value);
  }

  edit(value: Pick<TopicRaw, "title" | "description">) {
    Object.assign(this, value, { updatedAt: admin.firestore.Timestamp.now() });
  }

  isCreatedBy(value: { userId: string }) {
    return this.userId === value.userId;
  }
}
