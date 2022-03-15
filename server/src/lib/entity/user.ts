import * as admin from "firebase-admin";
import { z } from "zod";

import { Entity } from "./entity";

const UserSchema = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export type UserRaw = z.infer<typeof UserSchema>;

export type UserRawData = Omit<UserRaw, "id">;

export class UserEntity extends Entity<UserRaw> {
  static new(value: Pick<UserRaw, "id" | "displayName">) {
    return new UserEntity(value);
  }

  id = "";
  displayName = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();

  constructor(value: Partial<UserRaw>) {
    super();
    Object.assign(this, value);
  }

  toRaw() {
    const { ...raw } = this;
    return raw;
  }

  toRawData() {
    const { id, ...rawData } = this;
    return rawData;
  }
}
