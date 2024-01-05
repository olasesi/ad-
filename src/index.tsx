import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Adminii3UIControllerProvider } from "./context";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Adminii3UIControllerProvider>
        <App />
      </Adminii3UIControllerProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
