const  createServer =require( 'react')
import fse from 'fs-extra'
import { SRC_DIR } from '../shared/constant'
import { buildSiteEntry } from '../compiler/compileSiteEntry'
import { getDevConfig } from '../config/vite.config'
import { getVarletConfig } from '../config/varlet.config'
const { merge } = require("webpack-merge");
const { ensureDirSync } =fse;
export async function dev(cmd: { force?: boolean }) {
  // 设置环境
  process.env.NODE_ENV = 'development'
  // 确保src目录存在
  ensureDirSync(SRC_DIR)
  // 遍历src目录生成路由配置
  await buildSiteEntry()
  // 获取配置好的vite服务器配置
  const devConfig = getDevConfig(getVarletConfig())
  // 合并vite的强制刷新依赖选项
  const inlineConfig = merge(devConfig, cmd.force ? { server: { force: true } } : {})
  // 创建vite服务器实例
  const server = await createServer(inlineConfig)
  // 启动服务器
  await server.listen()
}
