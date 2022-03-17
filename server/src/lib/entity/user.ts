import { pipe } from "ramda";
import { z } from "zod";

const User = z
  .object({
    id: z.string(),
    displayName: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type User = z.infer<typeof User>;
export type __User__ = User;
export type UserData = Omit<User, "id">;

const of = (value: Partial<User>): User => ({
  id: "",
  displayName: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...value,
});

type CreateInput = Pick<User, "id" | "displayName">;
export const create: ({ id, displayName }: CreateInput) => User = pipe(of, User.parse);

export const UserEntity = {
  create,
};
