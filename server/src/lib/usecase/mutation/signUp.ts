import { ServerContext } from "../../../context";
import { MutationSignUpArgs, RequireFields } from "../../../graphql/generated";
import { UserEntity } from "../../entity/user";

export const signUp = async (
  _: Record<string, never>,
  args: RequireFields<MutationSignUpArgs, "input">,
  context: ServerContext
) => {
  const { displayName, email, password } = args.input;
  const { auth } = context;
  const { usersCollection } = context.collections;

  const { uid } = await auth.createUser({ email, password });
  const userData = UserEntity.create({ displayName });
  await usersCollection.dataRef.doc(uid).set(userData);
  return usersCollection.loader.load(uid);
};
