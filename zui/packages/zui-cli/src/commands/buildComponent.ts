import webpack from 'webpack';
import fse from 'fs-extra';
import { SRC_DIR } from '../shared/constant.js';
import { getBuildComponentConfig } from '../config/webpack.config.js';

const { ensureDirSync } = fse;
interface Options{
    name?:String
}
export async function buildComponent(option:Options) {
    process.env.NODE_ENV = 'production';
    if(option.name!==undefined){
        //解析参数 
        let arr:Array<String>=option.name?.split(" ");
        ensureDirSync(SRC_DIR);
        const buildConfig = getBuildComponentConfig(arr);
        webpack(buildConfig, (err, stats) => {
            if (err || stats&&stats.hasErrors()) {
                console.log(err)
                console.log(stats)
                console.error('Build failed.');
            } else {
                console.log('Build completed.');
            }
            });
    }
    else{
        console.error('Build failed as no component name input.');
    }

    
}
