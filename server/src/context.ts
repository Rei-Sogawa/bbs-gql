import { DataSources } from "./lib/datasource/index";

export type ServerContext = Record<string, never>;
export const serverContext = (): ServerContext => {
  return {};
};

export type Context = ServerContext & DataSources;
