import { now } from "../util/now";
import { DocRef } from "./hepler/types";

export type IUser = {
  id: string;
  ref: DocRef<IUser>;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserData = Omit<IUser, "id" | "ref">;

const of = (value: Partial<IUserData>): IUserData => {
  const _now = now();
  return {
    displayName: "",
    createdAt: _now,
    updatedAt: _now,
    ...value,
  };
};

const create: (input: Pick<IUserData, "displayName">) => IUserData = of;

export const UserEntity = {
  create,
};
