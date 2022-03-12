import React from "react";
import ReactDOM from "react-dom";
import { Apollo } from "./apollo";
import { App } from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Apollo>
      <App />
    </Apollo>
  </React.StrictMode>,
  document.getElementById("root")
);
