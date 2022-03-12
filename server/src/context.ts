import { Config, ExpressContext } from "apollo-server-express";

import { getAuth } from "./firebase-app";
import { DataSources } from "./lib/datasource/index";

export type ServerContext = { uid?: string };
export const serverContext: Config<ExpressContext>["context"] = async ({ req }): Promise<ServerContext> => {
  const idToken = req.header("authorization")?.split("Bearer ")[1];
  if (!idToken) return {};
  const decodedIdToken = await getAuth().verifyIdToken(idToken);
  return { uid: decodedIdToken.uid };
};

export type Context = ServerContext & { dataSources: DataSources };
