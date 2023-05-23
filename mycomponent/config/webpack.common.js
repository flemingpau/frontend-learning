const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {//模块构建的入口文件
    main: path.resolve(__dirname, "../src/component/index.tsx"),
  },
  module: {//处理不同资源模块
    rules: [
      {
        test: /\.(ts|js)x?$/i,//对js,tx,jsx,tsx进行处理
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",//不支持js最新特性的浏览器中使用es6+语法
              "@babel/preset-react",//将react转js
              "@babel/preset-typescript",//将ts转js
            ],
            plugins: [
              [//支持在低版本浏览器中使用es6+语法
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader']
      },
    ],
  },
  resolve: {
    alias: {//引入模块时可使用的别名
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],//模块解析过程中按顺序查找
  },
  plugins: [
    new HtmlWebpackPlugin({//创建html文件
      template: "public/index.html",
    }),
    //修改业务代码后界面可以自动局部刷新，而不是整体刷新
  ],
};