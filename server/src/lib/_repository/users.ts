import * as admin from "firebase-admin";
import { curry, omit, pipe } from "ramda";

import { IUser, IUserDate } from "../_entity/user";
import { createRootCollectionLoader, RootCollectionLoader } from "../repository/helper/createLoader";
import { createTypedConverter } from "../repository/helper/createTypedConverter";

// Repository
type UsersRef = admin.firestore.CollectionReference<IUserDate>;
type UsersLoader = RootCollectionLoader<IUserDate>;

const converter = createTypedConverter<IUserDate>();
const createRef = (db: admin.firestore.Firestore) => db.collection("users").withConverter(converter);
const createLoader = (db: admin.firestore.Firestore) => pipe(createRef, createRootCollectionLoader)(db);

const get = curry((loader: UsersLoader, id: string) => loader.load(id));
const set = curry(async (ref: UsersRef, user: IUser) => ref.doc(user.id).set(omit(["id"], user)));

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
