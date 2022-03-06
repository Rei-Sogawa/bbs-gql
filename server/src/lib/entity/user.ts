import { v4 } from "uuid";
import { z } from "zod";

import { Timestamp } from "../my-firebase-admin";

export const UserSchema = z.object({
  id: z.string().min(1),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type IUser = z.infer<typeof UserSchema>;

export class User {
  static of(init: Partial<IUser>): IUser {
    const user = {
      id: v4(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      ...init,
    };
    UserSchema.parse(user);
    return user;
  }
}
