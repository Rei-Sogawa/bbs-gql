import { UserData, UserDataSchema, UserDoc } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";

export class UsersCollection extends Collection<UserData, UserDoc> {
  constructor(ref: CollectionRef) {
    super(ref, UserDataSchema.parse, UserDoc.of);
  }
}
