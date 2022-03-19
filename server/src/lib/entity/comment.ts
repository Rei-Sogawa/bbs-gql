import { pick, pipe } from "ramda";
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

export type IComment = z.infer<typeof Comment>;

const of = (value: Partial<IComment>): IComment => ({
  id: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  rootId: "",
  parentId: "",
  userId: "",
  ...value,
});

type ICreateInput = Pick<IComment, "content" | "rootId" | "parentId" | "userId">;
const create: (input: ICreateInput) => IComment = pipe(
  pick(["content", "rootId", "parentId", "userId"]),
  of,
  Comment.parse
);

export const CommentEntity = {
  create,
};
