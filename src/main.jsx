import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./assets/theme/theme.css";
import "./index.css";
import { UserProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
