import * as admin from "firebase-admin";

import { UserRepository } from "./users";

export const createRepositories = (db: admin.firestore.Firestore) => ({
  usersRepository: UserRepository.of(db),
});

export type Repositories = ReturnType<typeof createRepositories>;
