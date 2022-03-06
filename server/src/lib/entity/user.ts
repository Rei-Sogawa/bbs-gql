import { v4 } from "uuid";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().min(1),
});

type IUser = z.infer<typeof UserSchema>;

export class User {
  static of(init: Partial<IUser>): IUser {
    const user = { id: v4(), ...init };
    UserSchema.parse(user);
    return user;
  }
}
