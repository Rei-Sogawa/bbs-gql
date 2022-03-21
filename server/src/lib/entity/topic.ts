import { mergeLeft, mergeRight, pick, pipe } from "ramda";

import { now } from "../util/now";
import { DocRef } from "./hepler/types";

export type ITopic = {
  id: string;
  ref: DocRef<ITopic>;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type ITopicData = Omit<ITopic, "id" | "ref">;

const of = (value: Partial<ITopicData>): ITopicData => {
  const _now = now();
  return {
    title: "",
    content: "",
    createdAt: _now,
    updatedAt: _now,
    userId: "",
    ...value,
  };
};

const create: (input: Pick<ITopicData, "title" | "content" | "userId">) => ITopicData = of;

const edit: (topic: ITopic, input: Pick<ITopic, "title" | "content">) => ITopic = pipe(
  (topic, input) => mergeRight(topic, input),
  mergeLeft({ updatedAt: now() })
);

const isCreatedBy = (topic: ITopic, { userId }: { userId: string }) => topic.userId === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
