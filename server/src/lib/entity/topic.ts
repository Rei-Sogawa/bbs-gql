import { mergeLeft, mergeRight, pipe } from "ramda";
import { z } from "zod";

const Topic = z
  .object({
    id: z.string(),
    title: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().min(1),
  })
  .strict();

export type Topic = z.infer<typeof Topic>;
export type TopicMapper = Topic;

const of = (value: Partial<Topic>): Topic => ({
  id: "",
  title: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "",
  ...value,
});

type CreateInput = Pick<Topic, "title" | "content" | "userId">;
const create: ({ title, content, userId }: CreateInput) => Topic = pipe(of, Topic.parse);

type EditInput = Pick<Topic, "title" | "content">;
const edit: (topic: Topic, { title, content }: EditInput) => Topic = pipe(
  mergeRight,
  mergeLeft({ updatedAt: new Date() }),
  Topic.parse
);

const isCreatedBy = (topic: Topic, { userId }: { userId: string }) => topic.userId === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
