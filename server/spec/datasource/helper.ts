import * as admin from "firebase-admin";

export type IUserData = {
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

export class UserData {
  static of(value: Partial<IUserData> = {}): IUserData {
    return {
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      ...value,
    };
  }
}
