module.exports = {
    presets: [
      [
        '@babel/preset-env',//不支持js最新特性的浏览器中使用es6+语法
        {
          targets: {
            node: 'current',
          },
        },
      ],
      "@babel/preset-react",//将react转js
      '@babel/preset-typescript',//将ts转js
    ],
  };
  