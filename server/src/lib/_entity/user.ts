import { z } from "zod";

import { Entity } from "./entity";

const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});

type IUserSchema = z.infer<typeof UserSchema>;

export type UserData = Omit<IUserSchema, "id">;

export class UserEntity extends Entity implements IUserSchema {
  displayName = "";
  createdAt = new Date();
  updatedAt = new Date();

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
