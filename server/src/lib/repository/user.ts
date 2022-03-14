import * as admin from "firebase-admin";

import { UserRawData } from "../entity/user";
import { createTypedConverter } from "./helper/createTypedConverter";
import { RootCollectionRepository } from "./repository";

export class UserRepository extends RootCollectionRepository<UserRawData> {
  constructor(db: admin.firestore.Firestore) {
    const ref = db.collection("users").withConverter(createTypedConverter<UserRawData>());
    super(ref);
  }
}
