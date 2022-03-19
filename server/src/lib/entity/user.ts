import { pick, pipe } from "ramda";
import { z } from "zod";

import { now } from "../util/now";

const User = z
  .object({
    id: z.string(),
    displayName: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type IUser = z.infer<typeof User>;

const of = (value: Partial<IUser>): IUser => {
  const _now = now();
  return {
    id: "",
    displayName: "",
    createdAt: _now,
    updatedAt: _now,
    ...value,
  };
};

type ICreateInput = Pick<IUser, "id" | "displayName">;
const create: (value: ICreateInput) => IUser = pipe(pick(["id", "displayName"]), of, User.parse);

export const UserEntity = {
  create,
};
