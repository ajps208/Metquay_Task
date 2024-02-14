import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./USER/Context/AuthContext";
import TokenAuth from "./ADMIN/Context/TokenAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <AuthContext>
   <TokenAuth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </TokenAuth>
   </AuthContext>
  </React.StrictMode>
);
