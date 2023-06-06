import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { merge } from 'webpack-merge';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//获取项目入口
function getProjectConfig(): Configuration{
  return {
    entry: {//模块构建的入口文件
      main: path.resolve(process.cwd(), "./src/index.tsx"),
    },
  }
}

//获取组件入口
function getComponentConfig(arr: Array<String>):Configuration{
  return {
    //不使用{...}的话获取的不是对象，从而导致入口设置错误
    //entries数组存放结果，之前把item直接作为索引报错了，一时间没有反应过来
    //reduce函数可以返回，而forEach函数不行所以这里得使用reduce
    entry: {...arr.reduce((entries:any,item)=>{//模块构建的入口文件
        entries[`${item}`]=(`${path.resolve(process.cwd(), `./src/components/src/${item}/index.tsx`)}`)
        return entries;
      },{})}
    // entry: {
    //   arr.forEach(item=>{//模块构建的入口文件
    //   return `${item}:path.resolve(process.cwd(), "./src/components/src/${item}.tsx")`
    // })
  }
}

//返回一些通用配置
export function getCommonConfig(): Configuration {
  return {
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
      "@": path.resolve(process.cwd(), "./src"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],//模块解析过程中按顺序查找
  },
  plugins: [
    new HtmlWebpackPlugin({//创建html文件
      template: "public/index.html",
    }),
    //修改业务代码后界面可以自动局部刷新，而不是整体刷新
  ],
  }
}

//生成对应的开发配置
export function getDevConfig(): Configuration {
  //使用项目入口以及通用配置来merge
  return merge(getProjectConfig(),getCommonConfig(),{
    mode: "development",//环境是构建开发还是生产环境
  output: {//出口
    filename: "[name].js",
    path: path.resolve(process.cwd(), "./build"),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //修改业务代码后界面可以自动局部刷新，而不是整体刷新
  ],
  devtool: "inline-source-map",//可以在让我们在谷歌开发工具中调试源代码
  devServer: {
    //开发服务器设置
    static: path.resolve(process.cwd(), "./build"),
    historyApiFallback: true,
    port: 8001,
    hot: true,
  },
  })
}

//生成打包配置
export function getBuildConfig(): Configuration {
  return merge(getProjectConfig(),getCommonConfig(),{
    mode: "production",
    devtool: 'source-map',
    output: {
      filename: "[name].[contenthash].js",
      publicPath: "",
      path: path.resolve(process.cwd(), "./build"),
      // 打包前清空输出目录
      clean: true,
    },
  });
}

//生成组件打包配置，由于当前只有一个组件，此功能还未经过测试可能存在问题
export function getBuildComponentConfig(arr:Array<String>): Configuration {
  return merge(getComponentConfig(arr), getCommonConfig(),{
    mode: "production",
    devtool: 'source-map',
    output: {
      filename: "[name].js",
      publicPath: "",
      path: path.resolve(process.cwd(), "./lib"),
      library: '[name]',
      libraryExport:"default",
    },
  });
}