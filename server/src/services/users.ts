import * as admin from "firebase-admin";
import { curry, omit, pipe } from "ramda";
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

const createForSignUp: (value: Pick<IUser, "id" | "displayName">) => IUser = pipe(of, schema.parse);

export const UserEntity = {
  createForSignUp,
};

// Repository
type UsersRef = admin.firestore.CollectionReference<IUserDate>;
type UsersLoader = RootCollectionLoader<IUserDate>;

const createRef = (db: admin.firestore.Firestore) => {
  const converter = createTypedConverter<IUserDate>();
  return db.collection("users").withConverter(converter);
};
const createLoader = (db: admin.firestore.Firestore) => {
  const ref = createRef(db);
  const loader = createRootCollectionLoader(ref);
  return loader;
};

const findById = curry((loader: UsersLoader, id: string) => loader.load(id));
const insert = curry(async (ref: UsersRef, user: IUser) => {
  const userData = omit(["id"], user);
  if (user.id) {
    await ref.doc(user.id).set(userData);
    return user;
  } else {
    const { id } = await ref.add(userData);
    return { ...user, id };
  }
});

export const UserRepository = {
  of(db: admin.firestore.Firestore) {
    const ref = createRef(db);
    const loader = createLoader(db);

    return {
      findById: findById(loader),
      insert: insert(ref),
    };
  },
};
