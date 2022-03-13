import { pathBuilder } from "@rei-sogawa/path-builder";

import { Index } from "../pages";
import { LogIn } from "../pages/log-in";
import { SignUp } from "../pages/sign-up";
import { Topic } from "../pages/topics/[topicId]";
import { TopicNew } from "../pages/topics/new";
import { WithAuth, WithoutAuth } from "./middleware";

const INDEX = "/";
const SIGN_UP = "/sign-up";
const LOG_IN = "/log-in";
const TOPIC_NEW = "/topics/new";
const TOPIC_SHOW = "/topics/:topicId";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: Index,
    middleware: [],
  },
  [SIGN_UP]: {
    path: pathBuilder(SIGN_UP),
    Component: SignUp,
    middleware: [WithoutAuth],
  },
  [LOG_IN]: {
    path: pathBuilder(LOG_IN),
    Component: LogIn,
    middleware: [WithoutAuth],
  },
  [TOPIC_NEW]: {
    path: pathBuilder(TOPIC_NEW),
    Component: TopicNew,
    middleware: [WithAuth],
  },
  [TOPIC_SHOW]: {
    path: pathBuilder(TOPIC_SHOW),
    Component: Topic,
    middleware: [],
  },
};

export const paths = Object.keys(routes) as (keyof typeof routes)[];
