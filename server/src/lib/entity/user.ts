import * as admin from "firebase-admin";
import { z } from "zod";

import { WithId } from "./types";

export const UserDataSchema = z.object({
  displayName: z.string().default(""),
  createdAt: z.instanceof(admin.firestore.Timestamp).default(admin.firestore.Timestamp.now()),
  updatedAt: z.instanceof(admin.firestore.Timestamp).default(admin.firestore.Timestamp.now()),
});

export type IUserData = z.infer<typeof UserDataSchema>;

export class UserData {
  static of(value: Partial<IUserData> = {}): IUserData {
    return UserDataSchema.parse(value);
  }
}

export type UserDoc = WithId<IUserData>;
