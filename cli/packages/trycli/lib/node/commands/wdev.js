import chokidar from 'chokidar';
import fse from 'fs-extra';
import logger from '../shared/logger.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { SRC_DIR, VARLET_CONFIG } from '../shared/constant.js';
import { getDevConfig } from '../config/webpack.config.js';
import { merge } from 'lodash-es';
const { ensureDirSync, pathExistsSync } = fse;
let server;
let watcher;
async function startServer(options) {
    const isRestart = Boolean(server);
    logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`);
    // close all instance
    server && (await server.close());
    watcher && (await watcher.close());
    // build all config
    const devConfig = getDevConfig();
    const webpackConfig = merge(devConfig, options.force ? { optimization: { moduleIds: 'named' } } : {});
    // create all instance
    if (webpackConfig.devServer) {
        const compiler = webpack(webpackConfig);
        server = new WebpackDevServer(compiler, webpackConfig.devServer);
        await server.start();
    }
    if (pathExistsSync(VARLET_CONFIG)) {
        watcher = chokidar.watch(VARLET_CONFIG);
        watcher.on('change', () => startServer(options));
    }
    logger.success(`\n${isRestart ? 'Res' : 'S'}tart successfully!!!`);
    if (options.draft) {
        logger.title('Server in draft mode!!!');
    }
}
export async function dev(options) {
    process.env.NODE_ENV = 'development';
    ensureDirSync(SRC_DIR);
    await startServer(options);
}
