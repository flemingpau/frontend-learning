import {Configuration} from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

export function html(): Configuration {
  return {
    plugins: [
      new HtmlWebpackPlugin({//创建html文件
        template: "public/index.html",
      }),
      //修改业务代码后界面可以自动局部刷新，而不是整体刷新
    ],
  }
}
