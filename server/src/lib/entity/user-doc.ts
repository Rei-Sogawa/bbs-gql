import * as admin from "firebase-admin";
import { omit } from "ramda";
import { z } from "zod";

export const UserDocSchema = z.object({
  id: z.string().min(1).nullable(),
  displayName: z.string().min(1),
  createdAt: z.instanceof(admin.firestore.Timestamp),
  updatedAt: z.instanceof(admin.firestore.Timestamp),
});

export const UserDataSchema = UserDocSchema.omit({ id: true });

export type IUserDoc = z.infer<typeof UserDocSchema>;

export type IUserData = z.infer<typeof UserDataSchema>;

export class UserDoc implements IUserDoc {
  id = null;
  displayName = "";
  createdAt = admin.firestore.Timestamp.now();
  updatedAt = admin.firestore.Timestamp.now();

  constructor(value: Partial<IUserDoc>) {
    UserDocSchema.parse(Object.assign(this, value));
  }

  toData(): IUserData {
    return omit(["id"], this);
  }

  update(value: Pick<IUserData, "displayName">) {
    UserDocSchema.parse(Object.assign(this, { updatedAt: admin.firestore.Timestamp.now(), ...value }));
  }
}
