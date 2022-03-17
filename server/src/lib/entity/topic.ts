import { mergeLeft, pipe } from "ramda";
import { z } from "zod";

const Topic = z
  .object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
  })
  .strict();

export type Topic = z.infer<typeof Topic>;
export type __Topic__ = Topic;
export type TopicData = Omit<Topic, "id">;

const of = (value: Partial<Topic>): Topic => ({
  id: "",
  title: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "",
  ...value,
});

type CreateInput = Pick<Topic, "title" | "description" | "userId">;
export const create: ({ title, description, userId }: CreateInput) => Topic = pipe(of, Topic.parse);

type EditInput = Pick<Topic, "title" | "description">;
export const edit: ({ title, description }: EditInput) => Topic = pipe(
  mergeLeft({ updatedAt: new Date() }),
  of,
  Topic.parse
);

export const isCreatedBy = (topic: Topic, { userId }: { userId: string }) => topic.id === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
