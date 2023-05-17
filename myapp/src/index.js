import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/App/App.css";
import "./components/Button/Button.css";
import App from "./components/App/App.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
