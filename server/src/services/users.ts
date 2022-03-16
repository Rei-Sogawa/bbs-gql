import * as admin from "firebase-admin";
import { curry, insert, omit, pipe } from "ramda";
import { z } from "zod";

import { createRootCollectionLoader, RootCollectionLoader } from "./../lib/repository/helper/createLoader";
import { createTypedConverter } from "./../lib/repository/helper/createTypedConverter";

// Entity
const schema = z
  .object({
    id: z.string().min(1),
    displayName: z.string().min(1),
    createdAt: z.instanceof(admin.firestore.Timestamp),
    updatedAt: z.instanceof(admin.firestore.Timestamp),
  })
  .strict();

type IUser = z.infer<typeof schema>;
type IUserDate = Omit<IUser, "id">;

const of = (value: Partial<IUser>) => ({
  id: "",
  displayName: "",
  createdAt: admin.firestore.Timestamp.now(),
  updatedAt: admin.firestore.Timestamp.now(),
  ...value,
});

const create: (value: Pick<IUser, "id" | "displayName">) => IUser = pipe(of, schema.parse);

export const UserEntity = {
  create,
};

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
