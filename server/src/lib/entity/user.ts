import * as admin from "firebase-admin";
import { z } from "zod";

import { Entity } from "./entity";

const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

type IUserSchema = z.infer<typeof UserSchema>;

export type UserData = Omit<IUserSchema, "id">;

export class UserEntity extends Entity implements IUserSchema {
  displayName = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();

  validate() {
    UserSchema.parse(this.toRaw());
  }

  constructor(value: Partial<UserEntity>) {
    super(value);
    Object.assign(this, value);
  }

  static new(value: Pick<UserEntity, "displayName">) {
    return new UserEntity(value);
  }
}
