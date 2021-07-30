import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import dotenv from "dotenv";
dotenv.config();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
