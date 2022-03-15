import * as admin from "firebase-admin";

import { UserRawData } from "../entity/user";
import { UserEntity } from "./../entity/user";
import { createRootCollectionLoader } from "./helper/createLoader";
import { createTypedConverter } from "./helper/createTypedConverter";
import { Repository } from "./repository";

export class UserRepository extends Repository<UserEntity> {
  usersRef;
  userLoader;

  constructor(db: admin.firestore.Firestore) {
    super();
    this.usersRef = db.collection("users").withConverter(createTypedConverter<UserRawData>());
    this.userLoader = createRootCollectionLoader(this.usersRef);
  }

  findById(id: string) {
    return this.userLoader.load(id).then((raw) => new UserEntity(raw));
  }

  create(user: UserEntity) {
    return user.id
      ? this.usersRef
          .doc(user.id)
          .set(user.toRawData())
          .then(() => user)
      : this.usersRef.add(user.toRawData()).then(({ id }) => new UserEntity({ id, ...user.toRawData() }));
  }

  update(user: UserEntity) {
    return this.usersRef
      .doc(user.id)
      .set(user.toRawData())
      .then(() => user);
  }

  delete(user: UserEntity) {
    return this.usersRef
      .doc(user.id)
      .delete()
      .then(() => user);
  }
}
