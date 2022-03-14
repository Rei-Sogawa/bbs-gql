import { ServerContext } from "../../context";

export function isLoggedIn(
  context: ServerContext
): asserts context is Required<Pick<ServerContext, "uid">> & Omit<ServerContext, "uid"> {
  if (!context.uid) throw new Error("Not Logged in");
}
