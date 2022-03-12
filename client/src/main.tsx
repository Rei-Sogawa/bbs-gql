import "./firebase-app";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { Auth } from "./context/Auth";

ReactDOM.render(
  <React.StrictMode>
    <Auth>
      <App />
    </Auth>
  </React.StrictMode>,
  document.getElementById("root")
);
