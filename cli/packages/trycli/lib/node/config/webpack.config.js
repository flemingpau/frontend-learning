import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { merge } from 'webpack-merge';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//获取项目入口
function getProjectConfig() {
    return {
        entry: {
            main: path.resolve(process.cwd(), "./src/index.tsx"),
        },
    };
}
//获取组件入口
function getComponentConfig(arr) {
    return {
        //不使用{...}的话获取的不是对象，从而导致入口设置错误
        //entries数组存放结果，之前把item直接作为索引报错了，一时间没有反应过来
        //reduce函数可以返回，而forEach函数不行所以这里得使用reduce
        entry: Object.assign({}, arr.reduce((entries, item) => {
            entries[`${item}`] = (`${path.resolve(process.cwd(), `./src/components/src/${item}/index.tsx`)}`);
            return entries;
        }, {}))
        // entry: {
        //   arr.forEach(item=>{//模块构建的入口文件
        //   return `${item}:path.resolve(process.cwd(), "./src/components/src/${item}.tsx")`
        // })
    };
}
//返回一些通用配置
export function getCommonConfig() {
    return {
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript", //将ts转js
                            ],
                            plugins: [
                                [
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
            alias: {
                "@": path.resolve(process.cwd(), "./src"),
            },
            extensions: [".tsx", ".ts", ".jsx", ".js"], //模块解析过程中按顺序查找
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html",
            }),
            //修改业务代码后界面可以自动局部刷新，而不是整体刷新
        ],
    };
}
//生成对应的开发配置
export function getDevConfig() {
    //使用项目入口以及通用配置来merge
    return merge(getProjectConfig(), getCommonConfig(), {
        mode: "development",
        output: {
            filename: "[name].js",
            path: path.resolve(process.cwd(), "./build"),
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            //修改业务代码后界面可以自动局部刷新，而不是整体刷新
        ],
        devtool: "inline-source-map",
        devServer: {
            //开发服务器设置
            static: path.resolve(process.cwd(), "./build"),
            historyApiFallback: true,
            port: 8001,
            hot: true,
        },
    });
}
//生成打包配置
export function getBuildConfig() {
    return merge(getProjectConfig(), getCommonConfig(), {
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
export function getBuildComponentConfig(arr) {
    return merge(getComponentConfig(arr), getCommonConfig(), {
        mode: "production",
        devtool: 'source-map',
        output: {
            filename: "[name].js",
            publicPath: "",
            path: path.resolve(process.cwd(), "./lib"),
            library: '[name]',
            libraryExport: "default",
        },
    });
}
