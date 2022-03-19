import { ServerContext } from "../../../context";
import { MutationSignUpArgs, RequireFields } from "../../../graphql/generated";
import { UserEntity } from "../../entity/user";

export const signUp = async (
  _: Record<string, never>,
  args: RequireFields<MutationSignUpArgs, "input">,
  context: ServerContext
) => {
  const { displayName, email, password } = args.input;
  const { AuthService } = context.services;
  const { UserRepository } = context.repositories;

  const { uid } = await AuthService.createUser({ email, password });
  const user = UserEntity.create({ id: uid, displayName });
  return UserRepository.set(user);
};
