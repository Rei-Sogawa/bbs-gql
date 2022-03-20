import { pick, pipe } from "ramda";
import { v4 } from "uuid";
import { z } from "zod";

import { now } from "../util/now";

const Comment = z
  .object({
    id: z.string().uuid(),
    _id: z.string().uuid(),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    rootId: z.string().min(1),
    parentId: z.string().min(1),
    userId: z.string().min(1),
  })
  .strict()
  .refine((v) => v.id === v._id, { message: "id and _id don not match" });

export type IComment = z.infer<typeof Comment>;

const of = (value: Partial<IComment>): IComment => {
  const _id = v4();
  const _now = now();
  return {
    id: _id,
    _id: _id,
    content: "",
    createdAt: _now,
    updatedAt: _now,
    rootId: "",
    parentId: "",
    userId: "",
    ...value,
  };
};

type ICreateInput = Pick<IComment, "content" | "rootId" | "parentId" | "userId">;
const create: (input: ICreateInput) => IComment = pipe(
  pick(["content", "rootId", "parentId", "userId"]),
  of,
  Comment.parse
);

const isCreatedBy = (comment: IComment, { userId }: { userId: string }) => comment.userId === userId;

export const CommentEntity = {
  create,
  isCreatedBy,
};
