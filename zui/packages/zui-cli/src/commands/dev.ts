import fse from 'fs-extra';
import logger from '../shared/logger.js';
import webpack from 'webpack';
import WebpackDevServer, { FSWatcher } from 'webpack-dev-server';
import { SRC_DIR } from '../shared/constant.js';
import { getDevConfig } from '../config/webpack.config.js';


const { ensureDirSync, pathExistsSync } = fse;

let server:WebpackDevServer;
let watcher:FSWatcher;

async function startServer() {
  const isRestart = Boolean(server);
  logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`);

  // close all instance
  server && (await server.close());
  watcher && (await watcher.close());

  // build all config
  const devConfig = getDevConfig();
  let webpackConfig = devConfig;
  // if (pathExistsSync(ZUI_CONFIG)) {
  //   const config=(await(import(`${path.resolve(CWD,ZUI_CONFIG)}`)))
  //   webpackConfig=merge(webpackConfig,config)
  // }
  // create all instance
  if( webpackConfig.devServer){
    const compiler = webpack(webpackConfig);
    server = new WebpackDevServer(compiler, webpackConfig.devServer);
    await server.start();
  }
  // if (pathExistsSync(path.resolve(CWD,ZUI_CONFIG))) {
  //   watcher = chokidar.watch(ZUI_CONFIG);
  //   watcher.on('change', () => startServer());
  // }

  logger.success(`\n${isRestart ? 'Res' : 'S'}tart successfully!!!`);

}

// interface DevCommandOptions {
//   customize?: boolean;
// }

export async function dev() {
  process.env.NODE_ENV = 'development';

  ensureDirSync(SRC_DIR);

  await startServer();
}
