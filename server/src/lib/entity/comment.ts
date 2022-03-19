import { pipe } from "ramda";
import { z } from "zod";

const Comment = z
  .object({
    id: z.string(),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    rootId: z.string().min(1),
    parentId: z.string().min(1),
    userId: z.string().min(1),
  })
  .strict();

export type Comment = z.infer<typeof Comment>;
export type CommentMapper = Comment;

const of = (value: Partial<Comment>): Comment => ({
  id: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  rootId: "",
  parentId: "",
  userId: "",
  ...value,
});

const CreateInput = Comment.pick({ content: true, rootId: true, parentId: true, userId: true }).strict();
type CreateInput = z.infer<typeof CreateInput>;
const create: (input: CreateInput) => Comment = pipe(CreateInput.parse, of, Comment.parse);

export const CommentEntity = {
  create,
};
