// doczrc.js
export default {
    files: './components/**/*.{md,markdown,mdx}', // 匹配要处理的文件
    dest: 'doc-site', // 打包出来的文件目录名
    title: 'xmh-ui', // 站点标题
    typescript: true // ts 项目需开启
  }