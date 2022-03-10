import * as admin from "firebase-admin";
import { v4 } from "uuid";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export type IUser = z.infer<typeof UserSchema>;

export class User {
  static of(value: Partial<IUser> | void) {
    return {
      id: v4(),
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      ...value,
    };
  }
}
