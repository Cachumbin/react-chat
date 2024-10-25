import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));

import App from "./App.tsx";
import "./App.css";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
