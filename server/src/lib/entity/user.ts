import * as admin from "firebase-admin";
import { z } from "zod";

import { Entity } from "./entity";

const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export type UserRaw = z.infer<typeof UserSchema>;

export type UserRawData = Omit<UserRaw, "id">;

export class UserEntity extends Entity<UserRaw> implements UserRaw {
  displayName = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();

  validate() {
    UserSchema.parse(this.toRaw());
  }

  constructor(value: Partial<UserRaw>) {
    super(value);
    Object.assign(this, value);
  }

  static new(value: Pick<UserRaw, "displayName">) {
    return new UserEntity(value);
  }
}
