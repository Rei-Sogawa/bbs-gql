import { mergeLeft, mergeRight, pick, pipe } from "ramda";
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

export type ITopic = z.infer<typeof Topic>;

const of = (value: Partial<ITopic>): ITopic => ({
  id: "",
  title: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "",
  ...value,
});

type ICreateInput = Pick<ITopic, "title" | "content" | "userId">;
const create: (value: ICreateInput) => ITopic = pipe(pick(["title", "content", "userId"]), of, Topic.parse);

type IEditInput = Pick<ITopic, "title" | "content">;
const edit: (topic: ITopic, value: IEditInput) => ITopic = pipe(
  (topic, value) => mergeRight(topic, pick(["title", "content"], value)),
  mergeLeft({ updatedAt: new Date() }),
  Topic.parse
);

const isCreatedBy = (topic: ITopic, { userId }: { userId: string }) => topic.userId === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
