import webpack from 'webpack';
import fse from 'fs-extra';
import { SRC_DIR } from '../shared/constant.js';
import { getBuildConfig } from '../config/webpack.config.js';

const { ensureDirSync } = fse;

export async function build() {
  process.env.NODE_ENV = 'production';

  ensureDirSync(SRC_DIR);
  const buildConfig = getBuildConfig();

  //调用webpack进行打包
  webpack(buildConfig, (err, stats) => {
    if (err || stats&&stats.hasErrors()) {
      console.error('Build failed.');
    } else {
      console.log('Build completed.');
    }
  });
}
