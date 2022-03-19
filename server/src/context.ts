import { Config, ExpressContext } from "apollo-server-express";
import * as admin from "firebase-admin";

import { getAuth, getDb } from "./firebase-app";
import { createRepositories, Repositories } from "./lib/repository";

export type ServerContext = {
  uid?: string;
  services: { AuthService: admin.auth.Auth };
  repositories: Repositories;
};

export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const db = getDb();
  const AuthService = getAuth();

  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return { services: { AuthService }, repositories: createRepositories(db) };

  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid, services: { AuthService }, repositories: createRepositories(db) };
};

export type Context = ServerContext;
