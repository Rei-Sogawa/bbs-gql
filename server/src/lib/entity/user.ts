import * as admin from "firebase-admin";
import { z } from "zod";

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
