import { mergeLeft, mergeRight, pipe } from "ramda";
import { v4 } from "uuid";

import { now } from "../util/now";
import { DocRef } from "./hepler/types";

export type IComment = {
  id: string;
  ref: DocRef<IComment>;
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentType: string;
  parentId: string;
};

export type ICommentData = Omit<IComment, "id" | "ref">;

const of = (value: Partial<ICommentData>): ICommentData => {
  const _id = v4();
  const _now = now();
  return {
    _id: _id,
    content: "",
    createdAt: _now,
    updatedAt: _now,
    userId: "",
    parentType: "",
    parentId: "",
    ...value,
  };
};

const create: (input: Pick<ICommentData, "content" | "parentType" | "parentId" | "userId">) => ICommentData = of;

const edit: (comment: IComment, input: Pick<IComment, "content">) => IComment = pipe(
  (comment, input) => mergeRight(comment, input),
  mergeLeft({ updatedAt: now() })
);

const isCreatedBy = (comment: IComment, { userId }: { userId: string }) => comment.userId === userId;

export const CommentEntity = {
  create,
  edit,
  isCreatedBy,
};
