//*

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

let root = ReactDOM.createRoot(document.getElementById("root"));
//<RouterProvider router={router} />
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
