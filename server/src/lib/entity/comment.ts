import { pipe } from "ramda";
import { z } from "zod";

import { now } from "../util/now";

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

const of = (value: Partial<IComment>): IComment => {
  const _now = now();
  return {
    id: "",
    content: "",
    createdAt: _now,
    updatedAt: _now,
    rootId: "",
    parentId: "",
    userId: "",
    ...value,
  };
};

const CreateInput = Comment.pick({ content: true, rootId: true, parentId: true, userId: true })
  .strict()
  .refine((v) => v.rootId === v.parentId, { message: "rootId and parentId do not match" });
type ICreateInput = Pick<IComment, "content" | "rootId" | "parentId" | "userId">;
const create: (input: ICreateInput) => IComment = pipe(CreateInput.parse, of, Comment.parse);

export const CommentEntity = {
  create,
};
