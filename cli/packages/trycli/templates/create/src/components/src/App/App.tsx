import React, { Component, FunctionComponent } from "react";
import { Button } from "../Button/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>组件库</p>
        </header>
        <main>
          <aside className="left">
            <ul>
              <li>
                <a href="">介绍</a>
              </li>
              <li>
                基础组件
                <ul>
                  <li>
                    <a>button</a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
          <aside className="middle">
            <Intro />
            <h1>button</h1>
            <Button>按钮</Button>
            <p>种类</p>
            <Button btnType="default">default</Button>
            <Button btnType="primary">primary</Button>
            <Button btnType="danger">danger</Button>
            <Button btnType="link">link</Button>
            <p>大小</p>
            <Button size="small">small</Button>
            <Button size="normal">normal</Button>
            <Button size="large">large</Button>
            <p>特殊</p>
            <Button disabled={true}>disabled</Button>
            <Button type="reset">reset</Button>
          </aside>
          <aside className="right"></aside>
        </main>
      </div>
    );
  }
}
const Intro: FunctionComponent = () => (
  <>
    <h1>介绍</h1>
    <p>
      这是第一次尝试搭建的组件库，是直接采用create-react-app搭建的，使用了selint以及prettier，暂时就这样
    </p>
  </>
);
export default App;
