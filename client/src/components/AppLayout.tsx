import { getAuth } from "firebase/auth";
import { ReactNode, useCallback, VFC } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";
import { routes } from "../routes";

type AppLayoutProps = { children: ReactNode };

export const AppLayout: VFC<AppLayoutProps> = ({ children }) => {
  const { uid } = useAuth();
  const signOut = useCallback(() => getAuth().signOut(), []);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b-2 border-gray-100 py-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <button
              className="btn btn-link text-lg"
              onClick={() => {
                navigate(routes["/"].path());
              }}
            >
              BBS
            </button>

            {uid ? (
              <div>
                <button className="btn btn-link" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    navigate(routes["/sign-up"].path());
                  }}
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    navigate(routes["/log-in"].path());
                  }}
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto">{children}</div>
    </div>
  );
};
