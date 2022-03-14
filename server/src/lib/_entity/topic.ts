import { z } from "zod";

import { Entity } from "./entity";

const TopicSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
  userId: z.string().min(1),
});

type ITopicSchema = z.infer<typeof TopicSchema>;

export class TopicEntity extends Entity implements ITopicSchema {
  title = "";
  description = "";
  createdAt = new Date();
  updatedAt = new Date();
  userId = "";

  validate() {
    TopicSchema.parse(this.toRaw());
  }

  constructor(value: Partial<TopicEntity>) {
    super(value);
    Object.assign(this, value);
  }

  static new(value: Pick<TopicEntity, "title" | "description" | "userId">) {
    return new TopicEntity(value);
  }

  edit(value: Pick<TopicEntity, "title" | "description">) {
    Object.assign(this, value);
  }

  isCreatedBy(value: { userId: string }) {
    return this.userId === value.userId;
  }
}
