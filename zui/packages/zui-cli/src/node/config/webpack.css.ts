// import MiniCssExtractPlugin from "mini-css-extract-plugin"
// import webpack, { Configuration } from 'webpack';
// function getProjectConfig(): Configuration{
//     return {
//         optimization:{
//             splitChunks:{
//                 cacheGroups:{
//                     styles:{
//                         name:"styles",
//                         type:"css/mini-extract",
//                         chunks:"all",
//                         enforce:true,
//                     },
//                 },
//             },
//         },
//       plugins: [//模块构建的入口文件
//         new MiniCssExtractPlugin({
//             filename:"[name].css",
//         }),
//     ],
//     module:{
//         rules:[{
//             test:/\.css$/,
//             use: [MiniCssExtractPlugin.loader,"css-loader"],
//         }],
//     },
//     }
//   }