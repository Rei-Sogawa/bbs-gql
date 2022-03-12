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
  static of(value: Partial<IUser> = {}) {
    return {
      id: v4(),
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      ...value,
    };
  }
}

export const UserDataSchema = z.object({
  createdAt: z.instanceof(admin.firestore.Timestamp).default(admin.firestore.Timestamp.now()),
  updatedAt: z.instanceof(admin.firestore.Timestamp).default(admin.firestore.Timestamp.now()),
});

export type IUserData = z.infer<typeof UserDataSchema>;

export class UserData {
  static of(value: Partial<IUserData> = {}): IUserData {
    return UserDataSchema.parse(value);
  }
}
