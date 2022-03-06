import * as admin from "firebase-admin";
import { v4 } from "uuid";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().min(1),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export type IUser = z.infer<typeof UserSchema>;

export class User {
  static of(init: Partial<IUser>): IUser {
    const user = {
      id: v4(),
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      ...init,
    };
    UserSchema.parse(user);
    return user;
  }
}
