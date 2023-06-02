import { after } from '../../../utils/after';
export const getFontRule = (afterFn) => after(function _() {
    return {
        test: /\.(eot|ttf|woff|woff2?)$/,
        type: 'asset/resource',
    };
}, afterFn);
