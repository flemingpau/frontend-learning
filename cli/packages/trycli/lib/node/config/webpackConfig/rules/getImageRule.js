import { after } from '../../../utils/after';
export const getImageRule = (afterFn) => after(function _() {
    return {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 4 * 1024,
            },
        },
    };
}, afterFn);
