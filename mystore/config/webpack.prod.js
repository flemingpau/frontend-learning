const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common,{
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "",
    path: path.resolve(__dirname, "../build"),
    // 打包前清空输出目录
    clean: true,
  },
});
