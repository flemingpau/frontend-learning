const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common,{
  mode: "development",//环境是构建开发还是生产环境
  output: {//出口
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //修改业务代码后界面可以自动局部刷新，而不是整体刷新
  ],
  devtool: "inline-source-map",//可以在让我们在谷歌开发工具中调试源代码
  devServer: {
    static: path.resolve(__dirname, "../build"),
    historyApiFallback: true,
    port: 8001,
    hot: true,
  },
});
