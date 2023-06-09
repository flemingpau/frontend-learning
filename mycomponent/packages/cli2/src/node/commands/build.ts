const fse =require('fs-extra')//文件管理库
import { SRC_DIR } from '../shared/constant.js'
import webpack from 'webpack'
import { getBuildConfig } from '../config/vite.config.js'
import { getVarletConfig } from '../config/varlet.config.js'
import { buildSiteEntry } from '../compiler/compileSiteEntry.js'

const { ensureDirSync } = fse

export async function build() {
  process.env.NODE_ENV = 'production'

  ensureDirSync(SRC_DIR)
  await buildSiteEntry(false)
  const varletConfig = await getVarletConfig()
  const buildConfig = getBuildConfig(varletConfig)

  await webpack(buildConfig)
}
