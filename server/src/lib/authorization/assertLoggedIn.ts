import { ServerContext } from "../../context";

export function assertLoggedIn(context: ServerContext): asserts context is Required<ServerContext> {
  if (!context.uid) throw new Error("Not Logged in");
}
