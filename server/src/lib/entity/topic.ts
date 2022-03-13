import * as admin from "firebase-admin";
import { z } from "zod";

import { WithId } from "./types";

export const TopicDataSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
  userId: z.string().min(1),
});

export type ITopicData = z.infer<typeof TopicDataSchema>;

export class TopicData {
  static of(value: Partial<ITopicData> = {}): ITopicData {
    const defaultValue: ITopicData = {
      title: "",
      description: "",
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      userId: "",
    };
    return { ...defaultValue, ...value };
  }

  static parse(value: ITopicData): ITopicData {
    return TopicDataSchema.parse(value);
  }
}

export type TopicDoc = WithId<ITopicData>;
