import { ReactNode, VFC } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";
import { routes } from ".";

type MiddlewareProps = { children: ReactNode };

export const WithAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (!uid) return <Navigate to={routes["/log-in"].path()} />;
  return <>{children}</>;
};

export const WithoutAuth: VFC<MiddlewareProps> = ({ children }) => {
  const { uid } = useAuth();
  if (uid) return <Navigate to={routes["/"].path()} />;
  return <>{children}</>;
};

type ComposeProps = {
  comps: VFC<{ children: ReactNode }>[];
  children: ReactNode;
};

// FIXME: なぜか VFC<ComposeProps> だと eslint error になる
//        https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
export const Compose = ({ comps, children }: ComposeProps) => {
  return (
    <>
      {comps.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
