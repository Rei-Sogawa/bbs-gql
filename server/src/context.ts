import { Config, ExpressContext } from "apollo-server-express";
import * as admin from "firebase-admin";

import { getAuth, getDb } from "./firebase-app";
import { Collections, createCollections } from "./lib/collection";

export type ServerContext = {
  uid?: string;
  auth: admin.auth.Auth;
  collections: Collections;
};

export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const auth = getAuth();
  const db = getDb();
  const collections = createCollections(db);

  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return { auth, collections };

  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid, auth, collections };
};

export type Context = ServerContext;
