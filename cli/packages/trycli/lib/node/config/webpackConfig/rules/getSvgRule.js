import { after } from '../../../utils/after';
export const getSvgRule = (afterFn) => after(function _() {
    return {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
    };
}, afterFn);
