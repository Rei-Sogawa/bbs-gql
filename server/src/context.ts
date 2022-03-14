import { Config, ExpressContext } from "apollo-server-express";

import { getAuth, getDb } from "./firebase-app";
import { createRepositories, Repositories } from "./lib/_repository/index";

export type ServerContext = {
  uid?: string;
  repositories: Repositories;
};

export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return { repositories: createRepositories(getDb()) };
  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid, repositories: createRepositories(getDb()) };
};

export type Context = ServerContext;
