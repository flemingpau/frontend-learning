import React, { Component, FunctionComponent } from "react";
import { Button } from "../Button/Button";

class App extends Component {
  render() {
    const typeArr=["default", "primary", "danger", "link"];
    const sizeArr=["small", "normal", "large"];
    // const nativeTypeArr=["button", "reset", "submit"];
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
            <h1>button组件</h1>
            <h2>基础用法</h2>
            <Button>default</Button>
            <code>{"<Button btnType=\"default\">default</Button>"}</code>
            <h2>种类</h2>
              {
                typeArr.map((item)=>{
                  return <><Button btnType={item}>{item}</Button>
                  <p><code>{`<Button btnType=${item}>${item}</Button>`}</code></p></>
                })
              }
            <h2>大小</h2>
            {
                sizeArr.map((item)=>{
                  return <><Button size={item}>{item}</Button>
                  <p><code>{`<Button size=${item}>${item}</Button>`}</code></p></>
                })
              }
            <h2>特殊</h2>
            <Button disabled={true}>disabled</Button>
            <p><code>{"<Button disabled=true>disabled</Button>"}</code></p>
            <Button type="reset">reset</Button>
            <p><code>{"<Button type=reset>reset</Button>"}</code></p>
          </aside>
        </main>
      </div>
    );
  }
}
const Intro: FunctionComponent = () => (
  <>
    <h1>介绍</h1>
    <p>
      这是使用zui-cli项目下用createStore命令调用模板create生成的组件库，如下展示了我写的一个按钮例子。
    </p>
  </>
);
export default App;
