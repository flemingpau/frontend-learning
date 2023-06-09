const path = require("path");
//用户自定义webpack.config.js
module.exports = {
    //需要定义入口
  entries: {
    index: {
      entry: ["./src/index.tsx"],
      template: "./public/index.html",
      // favicon: './favicon.ico',
    },
  },
  
};
