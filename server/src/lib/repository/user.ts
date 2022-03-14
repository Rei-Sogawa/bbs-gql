import * as admin from "firebase-admin";

import { UserData } from "../entity/user";
import { createTypedConverter } from "./helper/createTypedConverter";
import { RootCollectionRepository } from "./repository";

export class UserRepository extends RootCollectionRepository<UserData> {
  constructor(db: admin.firestore.Firestore) {
    const ref = db.collection("users").withConverter(createTypedConverter<UserData>());
    super(ref);
  }
}
