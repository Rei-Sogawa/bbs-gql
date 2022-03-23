import { ServerContext } from "../../../context";
import { MutationSignUpArgs, RequireFields } from "../../../graphql/generated";

export const signUp = async (
  _: Record<string, never>,
  args: RequireFields<MutationSignUpArgs, "input">,
  context: ServerContext
) => {};
