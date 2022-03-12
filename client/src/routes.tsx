import { pathBuilder } from "@rei-sogawa/path-builder";
import { ReactNode, VFC } from "react";

import { Index } from "./pages";
import { SignUp } from "./pages/sign-up";

const INDEX = "/";
const SIGN_UP = "/sign-up";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: Index,
  },
  [SIGN_UP]: {
    path: pathBuilder(SIGN_UP),
    Component: SignUp,
  },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];
