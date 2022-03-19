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

export type IUser = z.infer<typeof User>;

const of = (value: Partial<IUser>): IUser => ({
  id: "",
  displayName: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...value,
});

const CreateInput = User.pick({ id: true, displayName: true }).strict();
type ICreateInput = z.infer<typeof CreateInput>;
const create: (value: ICreateInput) => IUser = pipe(CreateInput.parse, of, User.parse);

export const UserEntity = {
  create,
};
