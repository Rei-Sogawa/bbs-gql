import { Config, ExpressContext } from "apollo-server-express";
import * as admin from "firebase-admin";

import { createRootCollections, RootCollections } from "./fire/createRootCollections";
import { getAuth, getDb } from "./firebase-app";

export type ServerContext = {
  uid?: string;
  auth: admin.auth.Auth;
  collections: RootCollections;
};

export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const auth = getAuth();
  const db = getDb();
  const collections = createRootCollections(db);

  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return { auth, collections };

  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid, auth, collections };
};

export type Context = ServerContext;
