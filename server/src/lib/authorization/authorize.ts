import { SetRequired } from "type-fest";

import { ServerContext } from "../../context";

export function authorize(context: ServerContext): asserts context is SetRequired<ServerContext, "uid"> {
  if (!context.uid) throw new Error("Not Logged in");
}
