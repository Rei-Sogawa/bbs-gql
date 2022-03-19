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
export type UserMapper = User;

const of = (value: Partial<User>): User => ({
  id: "",
  displayName: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...value,
});

const CreateInput = User.pick({ id: true, displayName: true }).strict();
type CreateInput = z.infer<typeof CreateInput>;
const create: (value: CreateInput) => User = pipe(CreateInput.parse, of, User.parse);

export const UserEntity = {
  create,
};
