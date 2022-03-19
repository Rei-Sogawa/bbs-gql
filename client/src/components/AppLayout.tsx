import { getAuth } from "firebase/auth";
import { ReactNode, useCallback, VFC } from "react";
import { FaPen, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";
import { routes } from "../routes";

const AppHeader: VFC = () => {
  const { uid } = useAuth();
  const signOut = useCallback(() => getAuth().signOut(), []);
  const navigate = useNavigate();

  return (
    <div className="border-b-2 border-gray-100 py-2">
      <div className="container mx-auto px-2">
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
            <div className="flex space-x-4">
              <button
                className="btn btn-primary flex items-center space-x-2"
                onClick={() => {
                  navigate(routes["/topics/new"].path());
                }}
              >
                <FaPen size="18" />
                <div>Add Topic</div>
              </button>

              <div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle">
                    <FaUser size="24" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <button className="btn btn-ghost" onClick={signOut}>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
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
  );
};

type AppLayoutProps = { children: ReactNode };

export const AppLayout: VFC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
};
