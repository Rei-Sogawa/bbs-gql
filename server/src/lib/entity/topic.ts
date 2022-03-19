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

const CreateInput = Topic.pick({ title: true, content: true, userId: true }).strict();
type CreateInput = z.infer<typeof CreateInput>;
const create: (value: CreateInput) => Topic = pipe(CreateInput.parse, of, Topic.parse);

const EditInput = Topic.pick({ title: true, content: true }).strict();
type EditInput = z.infer<typeof EditInput>;
const edit: (topic: Topic, value: EditInput) => Topic = pipe(
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
