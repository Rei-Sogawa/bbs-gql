import * as admin from "firebase-admin";
import { pipe } from "ramda";
import { z } from "zod";

// Entity
const schema = z
  .object({
    id: z.string().min(1),
    displayName: z.string().min(1),
    createdAt: z.instanceof(admin.firestore.Timestamp),
    updatedAt: z.instanceof(admin.firestore.Timestamp),
  })
  .strict();

export type IUser = z.infer<typeof schema>;
export type IUserDate = Omit<IUser, "id">;

const of = (value: Partial<IUser>) => ({
  id: "",
  displayName: "",
  createdAt: admin.firestore.Timestamp.now(),
  updatedAt: admin.firestore.Timestamp.now(),
  ...value,
});

const create: (value: Pick<IUser, "id" | "displayName">) => IUser = pipe(of, schema.parse);

export const UserEntity = {
  create,
};
