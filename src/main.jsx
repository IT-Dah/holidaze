import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./Router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
