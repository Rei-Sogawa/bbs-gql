import * as admin from "firebase-admin";
import { curry, omit, pipe } from "ramda";

import { IUser, IUserDate } from "../_entity/user";
import { createRootCollectionLoader, RootCollectionLoader } from "../repository/helper/createLoader";
import { createTimestampConverter } from "./../repository/helper/createTypedConverter";

// User
type UsersRef = admin.firestore.CollectionReference<IUserDate>;
type UsersLoader = RootCollectionLoader<IUserDate>;

const converter = createTimestampConverter<IUserDate>();
const createRef = (db: admin.firestore.Firestore) => db.collection("users").withConverter(converter);
const createLoader = (db: admin.firestore.Firestore) => pipe(createRef, createRootCollectionLoader)(db);

const get = curry((loader: UsersLoader, id: string) => loader.load(id));
const set = curry((ref: UsersRef, user: IUser) => ref.doc(user.id).set(omit(["id"], user)));

export const UserRepository = {
  of(db: admin.firestore.Firestore) {
    const ref = createRef(db);
    const loader = createLoader(db);

    return {
      get: get(loader),
      set: set(ref),
    };
  },
};
