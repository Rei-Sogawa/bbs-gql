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

const CreateInput = Topic.pick({ title: true, content: true, userId: true }).strict();
type CreateInput = z.infer<typeof CreateInput>;
const create: (value: CreateInput) => ITopic = pipe(CreateInput.parse, of, Topic.parse);

const EditInput = Topic.pick({ title: true, content: true }).strict();
type IEditInput = z.infer<typeof EditInput>;
const edit: (topic: ITopic, value: IEditInput) => ITopic = pipe(
  mergeRight,
  mergeLeft({ updatedAt: new Date() }),
  Topic.parse
);

const isCreatedBy = (topic: ITopic, { userId }: { userId: string }) => topic.userId === userId;

export const TopicEntity = {
  create,
  edit,
  isCreatedBy,
};
