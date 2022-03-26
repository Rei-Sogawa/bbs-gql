import { z } from "zod";

import { now } from "../../util/now";
import { Doc } from "../lib/document";
import { DocSnap, WithId } from "../lib/type";

export const UserDataSchema = z
  .object({
    __name: z.literal("user"),
    displayName: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type UserData = z.infer<typeof UserDataSchema>;

export type UserMapper = WithId<UserData>;

export class UserDoc extends Doc<UserData> implements UserData {
  __name!: "user";
  displayName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(snap: DocSnap<UserData>) {
    super(snap, UserDataSchema.parse);
  }

  static of(snap: DocSnap<UserData>) {
    return new UserDoc(snap);
  }

  static new({ displayName }: Pick<UserData, "displayName">): UserData {
    const _now = now();
    return {
      __name: "user",
      displayName,
      createdAt: _now,
      updatedAt: _now,
    };
  }
}
