import * as admin from "firebase-admin";
import { z } from "zod";

import { WithId } from "./types";

export const UserDataSchema = z.object({
  displayName: z.string().min(1),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export type IUserData = z.infer<typeof UserDataSchema>;

export class UserData {
  static of(value: Partial<IUserData> = {}): IUserData {
    const defaultValue: IUserData = {
      displayName: "",
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };
    return { ...defaultValue, ...value };
  }

  static parse(value: IUserData): IUserData {
    return UserDataSchema.parse(value);
  }
}

export type UserDoc = WithId<IUserData>;
