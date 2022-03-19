import { pipe } from "ramda";
import { z } from "zod";

const Comment = z.object({
  id: z.string(),
  content: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  rootId: z.string().min(1),
  parentId: z.string().min(1),
  userId: z.string().min(1),
});

export type Comment = z.infer<typeof Comment>;
export type CommentMapper = Comment;
export type CommentData = Omit<Comment, "id">;

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

type CreateInput = Pick<Comment, "content" | "rootId" | "parentId" | "userId">;
const create: ({ content, rootId, parentId, userId }: CreateInput) => Comment = pipe(of, Comment.parse);

export const CommentEntity = {
  create,
};
