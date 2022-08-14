import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import React from "react";
import App from "./App";

import "./styles/main.scss";

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
