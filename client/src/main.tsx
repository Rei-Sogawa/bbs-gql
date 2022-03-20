import "./firebase-app";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { Auth } from "./contexts/Auth";
import { Global } from "./contexts/Global";

ReactDOM.render(
  <React.StrictMode>
    <Global>
      <Auth>
        <App />
      </Auth>
    </Global>
  </React.StrictMode>,
  document.getElementById("root")
);
