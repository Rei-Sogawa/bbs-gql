import { mergeLeft, mergeRight, pick, pipe } from "ramda";
import { z } from "zod";

import { now } from "../util/now";

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

const of = (value: Partial<ITopic>): ITopic => {
  const _now = now();
  return {
    id: "",
    title: "",
    content: "",
    createdAt: _now,
    updatedAt: _now,
    userId: "",
    ...value,
  };
};

type ICreateInput = Pick<ITopic, "title" | "content" | "userId">;
const create: (input: ICreateInput) => ITopic = pipe(pick(["title", "content", "userId"]), of, Topic.parse);

type IEditInput = Pick<ITopic, "title" | "content">;
const edit: (topic: ITopic, input: IEditInput) => ITopic = pipe(
  (topic, input) => mergeRight(topic, pick(["title", "content"], input)),
  mergeLeft({ updatedAt: now() }),
  Topic.parse
);

const isCreatedBy = (topic: ITopic, { userId }: { userId: string }) => topic.userId === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
