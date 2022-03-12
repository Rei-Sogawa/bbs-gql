import { VFC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Apollo } from "./contexts/Apollo";
import { useAuth } from "./contexts/Auth";
import { Me } from "./contexts/Me";
import { paths, routes } from "./routes";
import { Compose } from "./routes/middleware";

export const App: VFC = () => {
  const { initialized } = useAuth();
  return initialized ? (
    <Apollo>
      <Me>
        <BrowserRouter>
          <Routes>
            {paths.map((path) => {
              const { Component, middleware } = routes[path];
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Compose comps={middleware}>
                      <Component />
                    </Compose>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </Me>
    </Apollo>
  ) : null;
};
