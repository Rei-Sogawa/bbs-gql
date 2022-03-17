import { pipe } from "ramda";
import { z } from "zod";

// User
const Schema = z
  .object({
    id: z.string().min(1),
    displayName: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

type ISchema = z.infer<typeof Schema>;
export type IUser = ISchema;
export type IUserDate = Omit<IUser, "id">;

const of = (value: Partial<IUser>) => ({
  id: "",
  displayName: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...value,
});

type ICreateInput = Pick<IUser, "id" | "displayName">;
const create: ({ id, displayName }: ICreateInput) => IUser = pipe(of, Schema.parse);

export const UserEntity = {
  create,
};
