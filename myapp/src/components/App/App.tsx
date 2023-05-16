import React, { FunctionComponent } from "react";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>组件库</p>
      </header>
      <main>
        <aside className="left">
          <ul>
            <li>开发指南</li>
            <li>基础组件</li>
          </ul>
        </aside>
        <aside className="middle"></aside>
        <aside className="right"></aside>
      </main>
    </div>
  );
};

export default App;
