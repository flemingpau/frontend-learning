import webpack from 'webpack';
import fse from 'fs-extra';
import { SRC_DIR } from '../shared/constant.js';
import { getBuildComponentConfig } from '../config/webpack.config.js';
const { ensureDirSync } = fse;
export async function buildComponent(option) {
    var _a;
    process.env.NODE_ENV = 'production';
    let arr;
    if (option.name !== undefined) {
        arr = (_a = option.name) === null || _a === void 0 ? void 0 : _a.split(" ");
        ensureDirSync(SRC_DIR);
        const buildConfig = getBuildComponentConfig(arr);
        webpack(buildConfig, (err, stats) => {
            if (err || stats && stats.hasErrors()) {
                console.error('Build failed.');
            }
            else {
                console.log('Build completed.');
            }
        });
    }
    else {
        console.error('Build failed as no component name input.');
    }
}
