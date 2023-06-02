import babelConfig from '../../babelConfig/es';
import { after } from '../../../utils/after';
export const getJsTsRule = (afterFn) => after(function _() {
    return {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
            'thread-loader',
            {
                loader: require.resolve('babel-loader'),
                options: babelConfig,
            },
        ],
    };
}, afterFn);
