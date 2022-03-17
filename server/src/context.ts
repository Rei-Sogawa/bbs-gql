import { Config, ExpressContext } from "apollo-server-express";

import { getAuth, getDb } from "./firebase-app";
import { createRepositories, Repositories } from "./lib/repository";

export type ServerContext = {
  uid?: string;
  repositories: Repositories;
};

export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const db = getDb();

  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return { repositories: createRepositories(db) };

  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid, repositories: createRepositories(db) };
};

export type Context = ServerContext;
