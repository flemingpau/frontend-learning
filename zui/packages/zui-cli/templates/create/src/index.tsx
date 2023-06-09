import React from "react";
import ReactDOM from "react-dom";
import App from "./components/src/index"
import "./index.css"
//react根组件，本代码将被注入到index.html中id='root'的位置。

// const Aa=()=><h1>My React ansd ts App</h1>
ReactDOM.render(
  <React.StrictMode>
    {/* <Aa /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
